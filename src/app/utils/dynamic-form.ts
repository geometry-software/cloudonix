import { FormControl, FormGroup, Validators } from "@angular/forms"

export const addNewKeyValueGroup = (): FormGroup =>
    new FormGroup({
        key: new FormControl<string | null>(null, Validators.required),
        value: new FormControl<string | null>(null, Validators.required),
    })
