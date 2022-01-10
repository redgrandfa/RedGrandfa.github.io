let vm = new Vue({
    el: '#sign-up-form',
    data: {
        form: {
            name: 'a',
            id:'a',
            email: 'za',
            line:'a',
            tel:'a',
        },
        // selected: 'third',
        // options: [
        //     { text: 'This one is Disabled', value: 'third', disabled: false },
        // ],
    },
    computed: {
        stateName() {
            return this.form.name.length >= 4
        },
        invalidFeedbackName() {
            if (this.form.name.length > 0) {
                return 'Enter at least 4 characters.'
            }
            return 'Please enter something.'
        }
    },    
    methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.form))
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.email = ''
            this.form.name = ''
            this.form.food = null
            this.form.checked = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
});

