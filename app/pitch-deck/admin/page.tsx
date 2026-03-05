"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Eye,
  Clock,
  Calendar,
  Building2,
  Mail,
  Phone,
  Linkedin,
  RefreshCw,
  UserPlus,
  Trash2,
  CheckCircle2,
  XCircle,
  Shield,
} from "lucide-react";

interface SlideAnalytics {
  views: number;
  totalTimeMs: number;
}

interface Viewer {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  linkedin: string | null;
  createdAt: string;
  totalSessions: number;
  totalSlideViews: number;
  slideAnalytics: Record<string, SlideAnalytics>;
  lastVisit: string;
}

interface AllowedViewer {
  id: string;
  email: string;
  name: string;
  company: string | null;
  addedAt: string;
  hasViewed: boolean;
  viewedAt: string | null;
  totalSessions: number;
  totalTimeMs: number;
  lastSession: string | null;
}

interface AdminData {
  overview: {
    totalViewers: number;
    totalSessions: number;
    totalSlideViews: number;
  };
  viewers: Viewer[];
}

const SLIDE_NAMES = [
  "cover",
  "problem",
  "solution",
  "product",
  "market",
  "business-model",
  "traction",
  "competition",
  "team",
  "ask",
];

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  return `${Math.round(ms / 60000)}m ${Math.round((ms % 60000) / 1000)}s`;
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PitchDeckAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);
  const [selectedViewer, setSelectedViewer] = useState<Viewer | null>(null);
  
  // Allowed viewers state
  const [allowedViewers, setAllowedViewers] = useState<AllowedViewer[]>([]);
  const [newViewer, setNewViewer] = useState({ email: "", name: "", company: "" });
  const [isAddingViewer, setIsAddingViewer] = useState(false);
  const [addError, setAddError] = useState("");
  
  // Tab state
  const [activeTab, setActiveTab] = useState<"analytics" | "allowlist">("analytics");

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/pitch-deck/admin?password=${encodeURIComponent(password)}`);
      if (!res.ok) {
        throw new Error("Invalid password");
      }
      const adminData = await res.json();
      setData(adminData);
      setIsAuthenticated(true);
      
      // Also fetch allowed viewers
      await fetchAllowedViewers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };
  
  const fetchAllowedViewers = async () => {
    try {
      const res = await fetch("/api/pitch-deck/admin/viewers", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        const data = await res.json();
        setAllowedViewers(data.viewers);
      }
    } catch (err) {
      console.error("Failed to fetch allowed viewers:", err);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  };
  
  const handleAddViewer = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingViewer(true);
    setAddError("");
    
    try {
      const res = await fetch("/api/pitch-deck/admin/viewers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(newViewer),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to add viewer");
      }
      
      // Refresh the list
      await fetchAllowedViewers();
      setNewViewer({ email: "", name: "", company: "" });
    } catch (err) {
      setAddError(err instanceof Error ? err.message : "Failed to add viewer");
    } finally {
      setIsAddingViewer(false);
    }
  };
  
  const handleDeleteViewer = async (id: string) => {
    if (!confirm("Remove this email from the allowlist?")) return;
    
    try {
      const res = await fetch(`/api/pitch-deck/admin/viewers/${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": password },
      });
      
      if (res.ok) {
        setAllowedViewers(prev => prev.filter(v => v.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete viewer:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center size-12 rounded-full bg-primary/10 mb-3">
              <Shield className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Pitch Deck Admin</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12"
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? "Loading..." : "View Dashboard"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Pitch Deck Admin</h1>
          <Button variant="outline" onClick={fetchData} disabled={isLoading}>
            <RefreshCw className={`size-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === "analytics"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Eye className="size-4 inline-block mr-2" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("allowlist")}
            className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 -mb-px ${
              activeTab === "allowlist"
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="size-4 inline-block mr-2" />
            Allowed Viewers ({allowedViewers.length})
          </button>
        </div>

        {/* Allowlist Tab */}
        {activeTab === "allowlist" && (
          <div className="space-y-6">
            {/* Add Viewer Form */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <UserPlus className="size-5" />
                Add Allowed Viewer
              </h2>
              <form onSubmit={handleAddViewer} className="flex flex-wrap gap-3">
                <Input
                  type="email"
                  placeholder="Email *"
                  value={newViewer.email}
                  onChange={(e) => setNewViewer(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="flex-1 min-w-[200px]"
                />
                <Input
                  type="text"
                  placeholder="Name *"
                  value={newViewer.name}
                  onChange={(e) => setNewViewer(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="flex-1 min-w-[150px]"
                />
                <Input
                  type="text"
                  placeholder="Company (optional)"
                  value={newViewer.company}
                  onChange={(e) => setNewViewer(prev => ({ ...prev, company: e.target.value }))}
                  className="flex-1 min-w-[150px]"
                />
                <Button type="submit" disabled={isAddingViewer}>
                  {isAddingViewer ? "Adding..." : "Add Viewer"}
                </Button>
              </form>
              {addError && <p className="text-sm text-red-500 mt-2">{addError}</p>}
            </div>
            
            {/* Allowed Viewers Table */}
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="p-4 border-b border-border bg-muted/30">
                <h2 className="text-lg font-semibold">Allowed Viewers</h2>
                <p className="text-sm text-muted-foreground">
                  {allowedViewers.filter(v => v.hasViewed).length} viewed / {allowedViewers.length} total
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="text-left p-3 font-medium text-sm">Status</th>
                      <th className="text-left p-3 font-medium text-sm">Name</th>
                      <th className="text-left p-3 font-medium text-sm">Email</th>
                      <th className="text-left p-3 font-medium text-sm">Company</th>
                      <th className="text-left p-3 font-medium text-sm">Added</th>
                      <th className="text-left p-3 font-medium text-sm">Sessions</th>
                      <th className="text-left p-3 font-medium text-sm">Time Spent</th>
                      <th className="text-left p-3 font-medium text-sm"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {allowedViewers.map((viewer) => (
                      <tr key={viewer.id} className="hover:bg-muted/30 transition-colors">
                        <td className="p-3">
                          {viewer.hasViewed ? (
                            <span className="inline-flex items-center gap-1 text-green-500">
                              <CheckCircle2 className="size-4" />
                              <span className="text-xs">Viewed</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <XCircle className="size-4" />
                              <span className="text-xs">Not viewed</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-medium">{viewer.name}</td>
                        <td className="p-3 text-sm text-muted-foreground">{viewer.email}</td>
                        <td className="p-3 text-sm text-muted-foreground">{viewer.company || "—"}</td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {new Date(viewer.addedAt).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-sm">
                          {viewer.totalSessions > 0 ? (
                            <span className="font-medium">{viewer.totalSessions}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-3 text-sm">
                          {viewer.totalTimeMs > 0 ? (
                            <span className="font-medium">{formatDuration(viewer.totalTimeMs)}</span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                        <td className="p-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteViewer(viewer.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {allowedViewers.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-muted-foreground">
                          No allowed viewers yet. Add one above to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <>
            {/* Overview Stats */}
            {data && (
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="size-5 text-blue-400" />
                    <span className="text-muted-foreground">Unique Viewers</span>
                  </div>
                  <div className="text-4xl font-bold">{data.overview.totalViewers}</div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Eye className="size-5 text-green-400" />
                    <span className="text-muted-foreground">Total Sessions</span>
                  </div>
                  <div className="text-4xl font-bold">{data.overview.totalSessions}</div>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="size-5 text-purple-400" />
                    <span className="text-muted-foreground">Slide Views</span>
                  </div>
                  <div className="text-4xl font-bold">{data.overview.totalSlideViews}</div>
                </div>
              </div>
            )}

            {/* Viewers List */}
            <div className="grid grid-cols-2 gap-6">
              {/* Viewers */}
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h2 className="text-lg font-semibold">View History ({data?.viewers.length || 0})</h2>
                </div>
                <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
                  {data?.viewers.map((viewer) => (
                    <button
                      key={viewer.id}
                      onClick={() => setSelectedViewer(viewer)}
                      className={`w-full p-4 text-left hover:bg-muted/30 transition-colors ${
                        selectedViewer?.id === viewer.id ? "bg-muted/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-medium">{viewer.name}</div>
                          <div className="text-sm text-muted-foreground">{viewer.email}</div>
                          {viewer.company && (
                            <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                              <Building2 className="size-3" />
                              {viewer.company}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{viewer.totalSessions} visits</div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(viewer.lastVisit)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                  {data?.viewers.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      No viewers yet
                    </div>
                  )}
                </div>
              </div>

              {/* Viewer Details */}
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="p-4 border-b border-border bg-muted/30">
                  <h2 className="text-lg font-semibold">
                    {selectedViewer ? selectedViewer.name : "Select a viewer"}
                  </h2>
                </div>
                {selectedViewer ? (
                  <div className="p-4 space-y-6">
                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="size-4 text-muted-foreground" />
                        <a href={`mailto:${selectedViewer.email}`} className="text-blue-400 hover:underline">
                          {selectedViewer.email}
                        </a>
                      </div>
                      {selectedViewer.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="size-4 text-muted-foreground" />
                          {selectedViewer.phone}
                        </div>
                      )}
                      {selectedViewer.company && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building2 className="size-4 text-muted-foreground" />
                          {selectedViewer.company}
                        </div>
                      )}
                      {selectedViewer.linkedin && (
                        <div className="flex items-center gap-2 text-sm">
                          <Linkedin className="size-4 text-muted-foreground" />
                          <a
                            href={selectedViewer.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="size-4 text-muted-foreground" />
                        First visit: {formatDate(selectedViewer.createdAt)}
                      </div>
                    </div>

                    {/* Slide Analytics */}
                    <div>
                      <h3 className="font-medium mb-3">Slide Analytics</h3>
                      <div className="space-y-2">
                        {SLIDE_NAMES.map((slideName, index) => {
                          const stats = selectedViewer.slideAnalytics[slideName];
                          return (
                            <div
                              key={slideName}
                              className="flex items-center justify-between p-2 rounded bg-muted/30"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                                <span className="text-sm capitalize">{slideName.replace("-", " ")}</span>
                              </div>
                              {stats ? (
                                <div className="flex items-center gap-4 text-sm">
                                  <span className="text-muted-foreground">
                                    {stats.views} view{stats.views !== 1 ? "s" : ""}
                                  </span>
                                  <span className="font-medium">
                                    {formatDuration(stats.totalTimeMs)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">Not viewed</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-muted-foreground">
                    Click on a viewer to see their analytics
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
