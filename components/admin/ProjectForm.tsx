"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageInput from "./ImageInput";
import ObjectListEditor from "./ObjectListEditor";
import StringListEditor from "./StringListEditor";
import GalleryEditor from "./GalleryEditor";

export type ProjectFormValues = {
  title: string;
  slug: string;
  status: "COMPLETED" | "ONGOING" | "UPCOMING";
  location: string;
  tagline: string;
  units: string;
  config: string;
  ptype: string;
  parking: string;
  transit: string;
  map: string;
  overviewHeading: string;
  overviewLead: string;
  content: string;
  excerpt: string;
  brochure: string;
  heroImage: string;
  floorplanImage: string;
  configs: { title: string; description: string }[];
  floorplanFeatures: string[];
  amCommunity: { title: string; description: string }[];
  amInfra: { title: string; description: string }[];
  amLifestyle: { title: string; description: string }[];
  places: { place: string; distance: string }[];
  gallery: string[];
  isSample: boolean;
  menuOrder: number;
};

const EMPTY: ProjectFormValues = {
  title: "",
  slug: "",
  status: "UPCOMING",
  location: "",
  tagline: "",
  units: "",
  config: "",
  ptype: "",
  parking: "",
  transit: "",
  map: "",
  overviewHeading: "",
  overviewLead: "",
  content: "",
  excerpt: "",
  brochure: "",
  heroImage: "",
  floorplanImage: "",
  configs: [],
  floorplanFeatures: [],
  amCommunity: [],
  amInfra: [],
  amLifestyle: [],
  places: [],
  gallery: [],
  isSample: false,
  menuOrder: 0,
};

export default function ProjectForm({
  initial,
  projectId,
}: {
  initial?: Partial<ProjectFormValues>;
  projectId?: number;
}) {
  const router = useRouter();
  const [v, setV] = useState<ProjectFormValues>({ ...EMPTY, ...initial });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function set<K extends keyof ProjectFormValues>(k: K, val: ProjectFormValues[K]) {
    setV((s) => ({ ...s, [k]: val }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const endpoint = projectId ? `/api/admin/projects/${projectId}` : "/api/admin/projects";
      const res = await fetch(endpoint, {
        method: projectId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && json.ok) {
        router.push("/admin/projects");
        router.refresh();
      } else {
        setError(json.error || "Could not save. Check the fields and try again.");
        setSaving(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form className="a-form a-panel" onSubmit={onSubmit}>
      {error && <div className="a-alert a-alert--error">{error}</div>}

      <div className="a-section-title">Basics</div>
      <div className="a-field">
        <label htmlFor="title">Title *</label>
        <input id="title" type="text" value={v.title} onChange={(e) => set("title", e.target.value)} required />
      </div>
      <div className="a-grid2">
        <div className="a-field">
          <label htmlFor="slug">Slug<span className="hint"> — leave blank to auto-generate</span></label>
          <input id="slug" type="text" value={v.slug} onChange={(e) => set("slug", e.target.value)} placeholder="redwood-utopia" />
        </div>
        <div className="a-field">
          <label htmlFor="status">Status</label>
          <select id="status" value={v.status} onChange={(e) => set("status", e.target.value as ProjectFormValues["status"])}>
            <option value="COMPLETED">Completed</option>
            <option value="ONGOING">Ongoing</option>
            <option value="UPCOMING">Upcoming</option>
          </select>
        </div>
      </div>
      <div className="a-grid2">
        <div className="a-field">
          <label htmlFor="location">Location</label>
          <input id="location" type="text" value={v.location} onChange={(e) => set("location", e.target.value)} placeholder="Jagatpura, Jaipur" />
        </div>
        <div className="a-field">
          <label htmlFor="menuOrder">Display order</label>
          <input id="menuOrder" type="number" value={String(v.menuOrder)} onChange={(e) => set("menuOrder", Number(e.target.value) || 0)} />
        </div>
      </div>
      <div className="a-field">
        <label htmlFor="tagline">Hero tagline</label>
        <input id="tagline" type="text" value={v.tagline} onChange={(e) => set("tagline", e.target.value)} />
      </div>
      <div className="a-field a-check">
        <input id="isSample" type="checkbox" checked={v.isSample} onChange={(e) => set("isSample", e.target.checked)} />
        <label htmlFor="isSample" style={{ margin: 0 }}>
          Mark as example/sample entry (shows the &quot;example entries&quot; note on the listing)
        </label>
      </div>

      <div className="a-section-title">Specifications</div>
      <div className="a-grid2">
        <div className="a-field">
          <label htmlFor="units">Total units</label>
          <input id="units" type="text" value={v.units} onChange={(e) => set("units", e.target.value)} placeholder="48" />
        </div>
        <div className="a-field">
          <label htmlFor="config">Configuration</label>
          <input id="config" type="text" value={v.config} onChange={(e) => set("config", e.target.value)} placeholder="2 & 3 BHK" />
        </div>
        <div className="a-field">
          <label htmlFor="ptype">Project type</label>
          <input id="ptype" type="text" value={v.ptype} onChange={(e) => set("ptype", e.target.value)} placeholder="Apartments" />
        </div>
        <div className="a-field">
          <label htmlFor="parking">Parking slots</label>
          <input id="parking" type="text" value={v.parking} onChange={(e) => set("parking", e.target.value)} placeholder="48" />
        </div>
        <div className="a-field">
          <label htmlFor="transit">Transit score</label>
          <input id="transit" type="text" value={v.transit} onChange={(e) => set("transit", e.target.value)} placeholder="65" />
        </div>
        <div className="a-field">
          <label htmlFor="map">Map location query</label>
          <input id="map" type="text" value={v.map} onChange={(e) => set("map", e.target.value)} placeholder="Jagatpura, Jaipur, Rajasthan" />
        </div>
      </div>
      <div className="a-field">
        <label htmlFor="brochure">Brochure URL<span className="hint"> — leave blank to use the site default</span></label>
        <input id="brochure" type="text" value={v.brochure} onChange={(e) => set("brochure", e.target.value)} />
      </div>

      <div className="a-section-title">Overview</div>
      <div className="a-field">
        <label htmlFor="overviewHeading">Overview heading</label>
        <input id="overviewHeading" type="text" value={v.overviewHeading} onChange={(e) => set("overviewHeading", e.target.value)} />
      </div>
      <div className="a-field">
        <label htmlFor="overviewLead">Overview lead<span className="hint"> — one or two intro sentences</span></label>
        <textarea id="overviewLead" value={v.overviewLead} onChange={(e) => set("overviewLead", e.target.value)} />
      </div>
      <div className="a-field">
        <label htmlFor="content">Overview body</label>
        <textarea id="content" value={v.content} onChange={(e) => set("content", e.target.value)} />
      </div>
      <div className="a-field">
        <label htmlFor="excerpt">Card excerpt<span className="hint"> — short summary for the listing card</span></label>
        <textarea id="excerpt" value={v.excerpt} onChange={(e) => set("excerpt", e.target.value)} style={{ minHeight: "70px" }} />
      </div>

      <div className="a-section-title">Images</div>
      <ImageInput label="Hero / main image" value={v.heroImage} onChange={(val) => set("heroImage", val)} />
      <ImageInput label="Floor plan image" value={v.floorplanImage} onChange={(val) => set("floorplanImage", val)} />
      <GalleryEditor value={v.gallery} onChange={(val) => set("gallery", val)} />

      <div className="a-section-title">Configurations</div>
      <ObjectListEditor
        label="Configurations"
        hint="e.g. 2 BHK Apartments + description"
        fields={[
          { key: "title", placeholder: "2 BHK Apartments" },
          { key: "description", placeholder: "Description", textarea: true },
        ]}
        value={v.configs}
        onChange={(val) => set("configs", val as ProjectFormValues["configs"])}
        addLabel="Add configuration"
      />

      <div className="a-section-title">Floor plan highlights</div>
      <StringListEditor
        label="Highlights"
        value={v.floorplanFeatures}
        onChange={(val) => set("floorplanFeatures", val)}
        placeholder="Central lift & staircase core"
        addLabel="Add highlight"
      />

      <div className="a-section-title">Amenities</div>
      <ObjectListEditor
        label="Community Spaces"
        fields={[
          { key: "title", placeholder: "Title" },
          { key: "description", placeholder: "Description", textarea: true },
        ]}
        value={v.amCommunity}
        onChange={(val) => set("amCommunity", val as ProjectFormValues["amCommunity"])}
      />
      <ObjectListEditor
        label="Infrastructure"
        fields={[
          { key: "title", placeholder: "Title" },
          { key: "description", placeholder: "Description", textarea: true },
        ]}
        value={v.amInfra}
        onChange={(val) => set("amInfra", val as ProjectFormValues["amInfra"])}
      />
      <ObjectListEditor
        label="Lifestyle"
        fields={[
          { key: "title", placeholder: "Title" },
          { key: "description", placeholder: "Description", textarea: true },
        ]}
        value={v.amLifestyle}
        onChange={(val) => set("amLifestyle", val as ProjectFormValues["amLifestyle"])}
      />

      <div className="a-section-title">Location — nearby places</div>
      <ObjectListEditor
        label="Nearby places"
        fields={[
          { key: "place", placeholder: "Hospital" },
          { key: "distance", placeholder: "1.5 km" },
        ]}
        value={v.places}
        onChange={(val) => set("places", val as ProjectFormValues["places"])}
        addLabel="Add place"
      />

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
        <button className="a-btn" type="submit" disabled={saving}>
          {saving ? "Saving…" : projectId ? "Save changes" : "Create project"}
        </button>
        <button type="button" className="a-btn a-btn--ghost" onClick={() => router.push("/admin/projects")}>
          Cancel
        </button>
      </div>
    </form>
  );
}
