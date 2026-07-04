import type { TeamMember } from "@/data/team";

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <article className="rounded-[6px] border border-[var(--border)] bg-[rgba(255,255,255,0.018)] p-5">
      <div className="flex items-start gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-[4px] border border-[var(--border)] bg-[rgba(255,255,255,0.03)] text-[11px] font-semibold text-[color:var(--foreground)]">
          {member.initials}
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--foreground)]">{member.name}</h3>
          <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">{member.role}</p>
        </div>
      </div>
      <p className="mt-5 text-xs leading-6 text-[color:var(--muted-foreground)]">{member.description}</p>
    </article>
  );
}
