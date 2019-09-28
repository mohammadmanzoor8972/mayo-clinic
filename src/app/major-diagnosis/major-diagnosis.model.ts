export interface MajorDiagnosis {
    _id: string;
    _etag: string;
    name: string;
    departmentId: string;
}

export interface Indication {
    _id: string;
    _etag: string;
    name: string;
    majordiagnosisId: string;
}
