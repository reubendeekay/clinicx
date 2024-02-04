# ClinicX Front end



 // get service search limit
  fetchServicesSearchLimit(): Observable<any> {
    const headers = this.getHeaders();

    return this.http.get(`${this.baseUrl}/services/search/limit`, {
      headers,
    });
  }

