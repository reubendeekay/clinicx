import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private baseUrl = environment.apiUrl; // Use environment variable

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        return new HttpHeaders()
            .set(
                'Authorization',
                `Bearer ${localStorage.getItem('token') || '{}'}` // Adjust token retrieval as needed
            )
            .set('Content-Type', 'application/json')
            .set('mode', 'no-cors');
    }

    // Authentication

    login(credentials: any): Observable<any> {
        const url = `${this.baseUrl}/login/`;
        const body = new URLSearchParams();
        body.set('username', credentials.username);
        body.set('password', credentials.password);
        const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

        return this.http.post(url, body.toString(), { headers });
    }

    // users

    createUser(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/users/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchUsers(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/users/`, {
            headers,
        });
    }

    fetchOneUser(userId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/users/${userId}`, {
            headers,
        });
    }

    deleteUser(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/users/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updateUser(userId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/users/${userId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }
    // branches api

    createBranch(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/branches/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchBranches(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/branches/`, {
            headers,
        });
    }

    fetchOneBranches(branchId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/branches/${branchId}`, {
            headers,
        });
    }

    deleteBranch(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/branches/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updateBranch(branchId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/branches/${branchId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // doctors api

    createDoctors(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/doctors/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchDoctors(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/doctors/`, {
            headers,
        });
    }

    fetchOneDoctor(doctorId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/doctors/${doctorId}`, {
            headers,
        });
    }

    deleteDoctors(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/doctors/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updateDoctors(doctorId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/doctors/${doctorId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // patients api

    createPatients(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/patients/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchPatients(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/patients/`, {
            headers,
        });
    }

    fetchOnePatients(patientId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/patients/${patientId}`, {
            headers,
        });
    }

    deletePatients(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/patients/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updatePatients(patientId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.patch(
            `${this.baseUrl}/patients/${patientId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // ****************************APPOINTMENTS******************************************
    createAppointments(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/appointments/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchAppointments(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/`, {
            headers,
        });
    }

    fetchOneAppointments(appointmentId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/${appointmentId}`, {
            headers,
        });
    }

    deleteAppointments(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/appointments/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updateAppointments(appointmentId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/appointments/${appointmentId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // get appointment count
    fetchAppointmentsCount(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/count`, {
            headers,
        });
    }

    // Get appointment county by doctor

    fetchAppointmentsDoctorCount(doctorId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/${doctorId}`, {
            headers,
        });
    }

    // Get appointment county by patient
    fetchAppointmentsPatientsCount(patientsId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/${patientsId}`, {
            headers,
        });
    }

    // Get appointment county by branch
    fetchAppointmentsBranchCount(branchId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/appointments/${branchId}`, {
            headers,
        });
    }

    // Get appointment  by doctor

    fetchAppointmentsDoctor(doctorId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/doctor/${doctorId}`,
            {
                headers,
            }
        );
    }

    // Get appointment  by patient

    fetchAppointmentsPatient(patientId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/patient/${patientId}`,
            {
                headers,
            }
        );
    }

    // Get appointment  by branch

    fetchAppointmentsBranch(branchId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/branch/${branchId}`,
            {
                headers,
            }
        );
    }

    // Get appointment  by doctor on date

    fetchAppointmentsDoctorDate(doctorId: any, date: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/doctor/${doctorId}/${date}`,
            {
                headers,
            }
        );
    }

    // Get appointment  by patient on date

    fetchAppointmentsPatientDate(patientId: any, date: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/patient/${patientId}/${date}`,
            {
                headers,
            }
        );
    }

    // Get appointment  by branch on date

    fetchAppointmentsBranchDate(branchId: any, date: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(
            `${this.baseUrl}/appointments/branch/${branchId}/${date}`,
            {
                headers,
            }
        );
    }

    // *****************SERVICES********************************
    createService(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/services/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchServices(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/`, {
            headers,
        });
    }

    fetchOneService(serviceId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/${serviceId}`, {
            headers,
        });
    }

    deleteService(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/services/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updateService(serviceId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/services/${serviceId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // get service count
    fetchServicesCount(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/count`, {
            headers,
        });
    }

    // get service search
    fetchServicesSearch(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/search`, {
            headers,
        });
    }

    //  // get service search count
    fetchServicesSearchCount(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/search/count`, {
            headers,
        });
    }

    // get service search limit
    fetchServicesSearchLimit(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/services/search/limit`, {
            headers,
        });
    }
    // ***************** Payments ********************************
    createPayment(payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.post(
            `${this.baseUrl}/payments/`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    fetchPayments(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/`, {
            headers,
        });
    }

    fetchOnePayment(paymentId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/${paymentId}`, {
            headers,
        });
    }

    deletePayment(payload: [any]): Observable<any> {
        const headers = this.getHeaders();

        return this.http.delete(
            `${this.baseUrl}/payments/${JSON.stringify(...payload)}`,
            {
                headers,
            }
        );
    }

    updatePayment(paymentId: any, payload: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.put(
            `${this.baseUrl}/payments/${paymentId}`,
            JSON.stringify(payload),
            {
                headers,
            }
        );
    }

    // get payment count
    fetchPaymentsCount(): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/count`, {
            headers,
        });
    }

    // Get payment county by doctor

    fetchPaymentsDoctorCount(doctorId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/${doctorId}`, {
            headers,
        });
    }

    // Get payment county by patient
    fetchPaymentsPatientsCount(patientsId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/${patientsId}`, {
            headers,
        });
    }

    // Get payment county by branch
    fetchPaymentsBranchCount(branchId: any): Observable<any> {
        const headers = this.getHeaders();

        return this.http.get(`${this.baseUrl}/payments/${branchId}`, {
            headers,
        });
    }
}
