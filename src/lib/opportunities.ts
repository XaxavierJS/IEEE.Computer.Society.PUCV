export type OpportunityType = 'beca' | 'competencia' | 'membresia';
export type OpportunityStatus = 'open' | 'closed';

export interface Opportunity {
  id: string;
  name: string;
  organizer: string;
  type: OpportunityType;
  eligibility: string;
  benefit: string;
  eventDate?: string;
  deadline: string | null;
  deadlineNote: string;
  url: string;
  sourceUrl: string;
  reviewed: string;
}

export const typeLabels: Record<OpportunityType, string> = {
  beca: 'Becas y premios',
  competencia: 'Competencias',
  membresia: 'Membresía',
};

/** A dated deadline in the past closes the opportunity; undated ones stay open (see deadlineNote). */
export function getStatus(item: Opportunity, now = new Date()): OpportunityStatus {
  if (!item.deadline) return 'open';
  return new Date(`${item.deadline}T23:59:59-06:00`) < now ? 'closed' : 'open';
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));
}
