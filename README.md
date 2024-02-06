# ClinicX Front end



<div class="field">
        <input
          type="text"
          pInputText
          placeholder="Latitude"
          formControlName="latitude"
          [style]="{ width: '100%' }"
        />
        <small
          id="username-help"
          class="block p-error"
          *ngIf="
            branchForm?.get('latitude')?.invalid && branchForm?.get('latitude')?.dirty
          "
          >Latitude is Required</small
        >
      </div>