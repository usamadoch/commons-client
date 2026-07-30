export interface Poll {
    options: { text: string; votes: number }[];
    totalVotes: number;
    endDate?: string | null;
    allowMultiple: boolean;
}
