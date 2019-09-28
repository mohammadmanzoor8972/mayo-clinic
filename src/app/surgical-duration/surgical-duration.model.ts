import { Physician } from '../physician/physician.model';
import { MajorDiagnosis } from '../major-diagnosis/major-diagnosis.model';

export interface SurgicalDuration {
    physicians: Physician[];
    majorDiagnosises: MajorDiagnosis[];
}

export interface SurgicalDurationMatrix {
    _id: string;
    _etag: string;
    departmentId: string;
    grid: GridItem[];
}

export interface GridItem {
    duration: number;
    majordiagnosisId: string;
    physicianId: string;
}
