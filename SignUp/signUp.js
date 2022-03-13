let vm = new Vue({
    el: '#sign-up-form',
    data: {
        show:true,
        form: {
            //個資
            name: '',
            gender:{
                selected:null,
                options: [
                    { value: true, text: '男' },
                    { value: false, text: '女' },
                ],
            },
            birth:'',
            id:'',
            //聯繫
            email: '',
            line:'',
            tel:'',
            //地緣
            school:'',
            schoolLocation: '',
            jobLocation: '',
            homelandLocation:'',
        },
        // selected: 'third',
        // options: [
        //     { text: 'This one is Disabled', value: 'third', disabled: false },
        // ],
    },
    computed: {
        stateName() {
            return this.form.name.length >= 2
        },
        invalidFeedbackName() {
            return '須至少兩個字'
        },
        //生日
        stateId() {
            let id = this.form.id;
            if(id.search(/[A-O]\d{9}/) != -1){
                // let alphabetCode = id[0]-'A'+ 10;
                // let resultNumber = Math.floor(alphabetCode/10) + (alphabetCode%10)*9;
                // for(let i = 1 ; i<= 8 ; i++){
                //     resultNumber += id[i]*(9-i);
                // }
                // resultNumber += id[9];
                // if(resultNumber%10 == 0)
                    return true;
            }
            return false;
        },
        invalidFeedbackId() {
            return '格式不合身分證字號規定'
        },

        stateEmail() {
            return this.form.email.search(/\w+@\w+\.\w+/) != -1
        },
        stateLine() {
            return this.form.line.length > 0
        },
        stateTel() {
            return this.form.tel.search(/09\d{8}/) != -1 ;
        },

        //
        stateSchool() {
            return this.form.tel.length > 0 ;
        },

    },
    methods: {
        onSubmit(event) {
            event.preventDefault()
            console.log(JSON.stringify(this.form))
            
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.form.name = ''
            this.form.birth = ''
            this.form.gender.selected = null;
            this.form.id = ''

            this.form.email = ''
            this.form.line = ''
            this.form.tel = ''


            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
});

const twzipcode = new TWzipcode(".twzipcode" ,{});


