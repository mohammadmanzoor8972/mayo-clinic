import {Http } from '@angular/http';
import { HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Department } from './department/department.model';
import { Physician } from './physician/physician.model';
import { Observable } from 'rxjs/Observable';
import { MajorDiagnosis, Indication } from './major-diagnosis/major-diagnosis.model';
import { SurgicalDurationMatrix } from './surgical-duration/surgical-duration.model';
import { Day, CapacityMatrix } from './physician-capacity/physician-capacity.model';
import { Priority } from './priority/priority.model';

@Injectable()
export class ServiceClass {
    constructor(private httpClient: HttpClient) { }
    getDepartments() {
        return this.httpClient.get('https://clwd0002186.mayo.edu/department')
        .map((json: any) => {
            console.log(json._items);
            return json._items;
        });
    }
    addDepartment(department: Department) {
        return this.httpClient.post('https://clwd0002186.mayo.edu/department', department, {observe: 'response'})
        .map((resp) => {
            return resp.headers.get('location');
        });
    }
    getDepartment(location: string) {
        return this.httpClient.get(location);
    }
    removeDepartment(department: Department) {
        return this.httpClient.delete('https://clwd0002186.mayo.edu/department/' + department._id,
        {headers: new HttpHeaders().set('If-Match', department._etag)}
        );
    }
}

@Injectable()
export class PhysicianService {
    constructor(private httpClient: HttpClient) { }
    getPhysicians(departmentId: string) {
        // figure out department stuff
        return this.httpClient.get('https://clwd0002186.mayo.edu/physician?where={"departmentId":"' + departmentId + '"}')
        .map((json: any) => {
            console.log(json._items);
            return json._items;
        });
    }
    getPhysician(location: string) {
        return this.httpClient.get(location);
    }
    addPhysician(physician: Physician) {
        return this.httpClient.post('https://clwd0002186.mayo.edu/physician', physician, {observe: 'response'})
        .map((resp) => {
            return resp.headers.get('location');
        });
    }
    removePhysician(physician: Physician) {
        return this.httpClient.delete('https://clwd0002186.mayo.edu/physician/' + physician._id,
        {headers: new HttpHeaders().set('If-Match', physician._etag)}
        );
    }
    getUserByLanId(lanId: string) {
        return this.httpClient.get('https://dev.apimc.mayo.edu/dss-cows/v1/employee/' + lanId)
        .map((json: any) => {
            return {
                firstName: json.givenName,
                lastName: json.surname,
                title: json.title,
                personId: json.personId,
                racfId: json.racfId,
                lanId: json.lanId,
                employeeId: json.employeeId
            } as Physician;
        });
    }
}
@Injectable()
export class MajorDiagnosisService {
    constructor(private httpClient: HttpClient) { }
    getMajorDiagnosises(departmentId: string) {
        return this.httpClient.get('https://clwd0002186.mayo.edu/majordiagnosis?where={"departmentId":"' + departmentId + '"}')
        .map((json: any) => {
            console.log(json._items);
            return json._items;
        });
    }
    getMajorDiagnosis(location: string) {
        return this.httpClient.get(location);
    }
    addMajorDiagnosis(majorDiagnosis: MajorDiagnosis) {
        return this.httpClient.post('https://clwd0002186.mayo.edu/majordiagnosis', majorDiagnosis, {observe: 'response'})
        .map((resp) => {
            return resp.headers.get('location');
        });
    }
    removeMajorDiagnosis(majorDiagnosis: MajorDiagnosis) {
        return this.httpClient.delete('https://clwd0002186.mayo.edu/majordiagnosis/' + majorDiagnosis._id,
        {headers: new HttpHeaders().set('If-Match', majorDiagnosis._etag)}
        );
    }
}
@Injectable()
export class IndicationService {
    constructor(private httpClient: HttpClient) {}
    getIndications(majorDiagnosisId: string) {
        return this.httpClient.get('https://clwd0002186.mayo.edu/indication?where={"majordiagnosisId":"' + majorDiagnosisId + '"}')
        .map((json: any) => {
            return json._items as Indication[];
        });
    }
    getIndication(location: string) {
        return this.httpClient.get(location);
    }
    addIndication(indication: Indication) {
        return this.httpClient.post('https://clwd0002186.mayo.edu/indication', indication, {observe: 'response'})
        .map((resp) => {
            return resp.headers.get('location');
        });
    }
    removeIndication(indication: Indication) {
        return this.httpClient.delete('https://clwd0002186.mayo.edu/indication/' + indication._id,
        {headers: new HttpHeaders().set('If-Match', indication._etag)}
        );
    }
}
@Injectable()
export class SurgicalDurationService {
    constructor(private httpClient: HttpClient) {}
    getSurgicalDurations(departmentId: string) {
        return this.httpClient.get('https://clwd0002186.mayo.edu/surgicalduration?where={"departmentId":"' + departmentId + '"}')
        .map((json: any) => {
            return json._items as SurgicalDurationMatrix[];
        });
    }
    saveSurgicalDuration(surgicalDurationMatrix: SurgicalDurationMatrix) {
        // have to figure a bit of this out...
        if (surgicalDurationMatrix._etag) {
            const toSave = {
                _id: surgicalDurationMatrix._id,
                departmentId: surgicalDurationMatrix.departmentId,
                grid: surgicalDurationMatrix.grid} as SurgicalDurationMatrix;
            return this.httpClient.put('https://clwd0002186.mayo.edu/surgicalduration/' + surgicalDurationMatrix._id,
                toSave,
                {observe: 'response', headers: new HttpHeaders().set('If-Match', surgicalDurationMatrix._etag)})
            .map((resp) => {
                return 'https://clwd0002186.mayo.edu/surgicalduration/' + surgicalDurationMatrix._id; //resp.headers.get('location');
            });
        } else {
            return this.httpClient.post('https://clwd0002186.mayo.edu/surgicalduration', surgicalDurationMatrix, {observe: 'response'})
            .map((resp) => {
                return resp.headers.get('location');
            });
        }
    }
    getSurgicalDuration(location: string) {
        return this.httpClient.get(location);
    }
}
@Injectable()
export class DayService {
    getDays() {
        return Observable.of([
            // {weekday: 0, name: 'Sunday'},
            {weekday: 1, name: 'Monday'},
            {weekday: 2, name: 'Tuesday'},
            {weekday: 3, name: 'Wednesday'},
            {weekday: 4, name: 'Thursday'},
            {weekday: 5, name: 'Friday'},
            // {weekday: 6, name: 'Saturday'},
        ]) as Observable<Day[]>;
    }
}
@Injectable()
export class CapacityService {
    constructor(private httpClient: HttpClient) {}
    getCapacities(departmentId: string) {
        return this.httpClient.get('https://clwd0002186.mayo.edu/capacity?where={"departmentId":"' + departmentId + '"}')
        .map((json: any) => {
            return json._items as CapacityMatrix[];
        });
    }
    getCapacity(location: string) { return this.httpClient.get(location); }
    saveCapacity(capacityMatrix: CapacityMatrix) {
        if (capacityMatrix._etag) {
            const toSave = {
                _id: capacityMatrix._id,
                departmentId: capacityMatrix.departmentId,
                grid: capacityMatrix.grid} as CapacityMatrix;
            return this.httpClient.put('https://clwd0002186.mayo.edu/capacity/' + capacityMatrix._id,
                toSave,
                {observe: 'response', headers: new HttpHeaders().set('If-Match', capacityMatrix._etag)})
            .map((resp) => {
                return 'https://clwd0002186.mayo.edu/capacity/' + capacityMatrix._id; //resp.headers.get('location');
            });
        } else {
            return this.httpClient.post('https://clwd0002186.mayo.edu/capacity', capacityMatrix, {observe: 'response'})
            .map((resp) => {
                return resp.headers.get('location');
            });
        }
    }
}

@Injectable()
export class PriorityService {
  constructor(private httpClient: HttpClient) {}
  getPrioritys() {    
    return this.httpClient.get('https://clwd0002186.mayo.edu/priority')
    .map((json: any) => {
        console.log(json._items);
        return json._items;
    });
 }
  addPriority(inline, deptId) {
    var obj = {
      "departmentId" : deptId,
      "grid" : inline.priority
    }
    console.log("****INdia;");
    console.log(obj);
    return this.httpClient.post('https://clwd0002186.mayo.edu/priority', obj, {observe: 'response'})
      .map((resp) => {
        return resp.headers.get('location');
      });
  }  
  getPriority(location: string) {
    return this.httpClient.get(location);
}


removePriority(priority: Priority) {
    return this.httpClient.delete('https://clwd0002186.mayo.edu/priority/' + priority._id,
    {headers: new HttpHeaders().set('If-Match', priority._etag)}
    );
}
}
