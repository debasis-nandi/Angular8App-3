export interface IFaq{
    faqid?: number;
    faqSectionID?: number;
    faQuestion?: string;
    faqAnswer?: string;
}

export interface IFaqSection {
    id?: number;
    displayName?: string;
    displayHeader?: string;
    faQs?: IFaq[];
}