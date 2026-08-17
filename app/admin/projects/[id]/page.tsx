import { notFound } from "next/navigation";
import { requireSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { asListItems, asStrings, asPlaces } from "@/lib/data";
import ProjectForm, { type ProjectFormValues } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  await requireSession();
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: Number(id) } });
  if (!project) notFound();

  const initial: Partial<ProjectFormValues> = {
    title: project.title,
    slug: project.slug,
    status: project.status,
    location: project.location || "",
    tagline: project.tagline || "",
    units: project.units || "",
    config: project.config || "",
    ptype: project.ptype || "",
    parking: project.parking || "",
    transit: project.transit || "",
    map: project.map || "",
    overviewHeading: project.overviewHeading || "",
    overviewLead: project.overviewLead || "",
    content: project.content || "",
    excerpt: project.excerpt || "",
    brochure: project.brochure || "",
    heroImage: project.heroImage || "",
    floorplanImage: project.floorplanImage || "",
    configs: asListItems(project.configs),
    floorplanFeatures: asStrings(project.floorplanFeatures),
    amCommunity: asListItems(project.amCommunity),
    amInfra: asListItems(project.amInfra),
    amLifestyle: asListItems(project.amLifestyle),
    places: asPlaces(project.places),
    gallery: asStrings(project.gallery),
    isSample: project.isSample,
    menuOrder: project.menuOrder,
  };

  return (
    <>
      <h1 className="a-h1">Edit project</h1>
      <p className="a-sub">/{project.slug}</p>
      <ProjectForm initial={initial} projectId={project.id} />
    </>
  );
}
