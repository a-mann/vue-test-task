<template>
  <div id="app">
    <form class="comp-1-container">
      <p id="article">ЗАЯВКА НА УЧАСТИЕ В ЗАБЕГЕ</p>
      <div>
        <p>ФИО</p>
        <input placeholder="ФИО" v-model="name"/>
      </div>
      <div>
        <p>Дата рождения</p>
        <input type="date" id="date-input" placeholder="Дата рождения" max="2005-01-01"  v-model="date"/>
      </div>
      <div>
        <p>Email</p>
        <input id="email-input" type="email" placeholder="Email" :class="{'wrong-email': !this.isEmailWalid}" v-model="email">
      </div>
      <div>
        <p>Телефон</p>
        <input id="tel-input" placeholder="Телефон" v-model="phone"/>
      </div>
      <div>
        <p>Дистанция забега</p>
        <select placeholder="Дистанция" v-model="distance">
          <option value="" disabled selected>Дистанция забега</option>
          <option>3 км</option>
          <option>5 км</option>
          <option>10 км</option>
        </select>
      </div>
      <div>
        <p>Сумма взноса, руб</p>
        <input type="" id="contribution" placeholder="Сумма взноса, руб" v-model="payment"/>
      </div>
      <div id="button" @click="onBtnClick" :class="{'btn-disabled':this.formFilled}">Подать заявку</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      name: "",
      date: "",
      email: "",
      phone: "",
      distance: "",
      payment: "",
      isEmailWalid: true
    }
  },

  mounted() {
    this.isEmailWalid = true;
    let telInput =  $('#tel-input');
    let contributionInput =  $('#contribution');
    let emailInput =  $('#email-input');

    telInput.mask('+7 (999) 999-99-99',{autoclear: false});
    telInput.on('blur', () => {this.phone = telInput.val()})

    contributionInput.on('input', () => {
      let finLabel = ", руб.";
      let value = contributionInput.val();
      let val = value.substr(0,value.indexOf(","));

      if(Number(val) !== Number(val))
      {
        value = val.substr(0,val.length - 1);
      }else {
        value = val;
      }

      this.payment = value + finLabel;
      contributionInput.val(value + finLabel);
    })

    contributionInput.on("focus", () => {contributionInput.val(", руб.")})

    emailInput.on('blur', () => {
      let val = emailInput.val();
      if(val.indexOf("@") == -1 
      || val.substr(val.indexOf("@") + 1, val.length).length <= 0)
      {
        this.isEmailWalid = false;
      } else {
        this.isEmailWalid = true;
      }
    })
  },
  computed: {
    formFilled: function() {
      return this.name == "" 
            || this.date == "" 
            || this.email == "" 
            || this.email.indexOf("@") == -1 
            || this.email.substr(this.email.indexOf("@") + 1, this.email.length).length <= 0
            || this.phone == "" 
            || String(this.distance) == "" 
            || String(this.payment) == "" 
    }
  },
  methods:{
    onBtnClick() {
      let User = { 
        name: this.name,
        date: this.dateFormat(this.date),
        email: this.email,
        phone: this.deleteTelMask(this.phone),
        distance: (this.distance.replace("км","")),
        payment: (this.payment.replace(", руб.","")),
        id: (this.$store.state.obj.length + 1)
      }
      
      this.$store.commit("pushObj", User)

      this.name = "";
      this.date = "";
      this.email = "";
      this.phone = "";
      this.distance = "";
      this.payment = "";
    },

    deleteTelMask(tel) {
      return tel.replace(/-/g,"")
                      .replace(/ /g,"")
                      .replace(/\(/g,"")
                      .replace(/\)/g,'')
                      .replace(/_/g,'');
    },
    dateFormat(date) {
      return date.split("-")
                 .reverse()
                 .join(".");
    }
  }
}
</script>

<style lang="scss">
  $inputBgdColor : #61a64e;
  $tableBgdColor : #7a7a7a;
  $btnColor : #66935d;
  $btnColorHover : #71a866;
  $btnColorActive : #55794d;
  $fontColor : #909799;

  #app{
    .comp-1-container {
      margin: auto;
      height: 60vh;
      min-height: 130px;
      min-width: 1200px;
      background-color: $inputBgdColor;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      color:white;
      text-align: center;

      p{
        font-size: 0.8em;
        margin-top: 5px;
      }
      input, select {
        width: 200px;
        height: 20px;
        margin: 5px;
        padding: 0px;
        text-align: center;
        color:rgb(58, 58, 58);
        text-align-last: center;
      }
      #button {
        width: 250px;
        height: 30px;
        background-color: $btnColor;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 15px;
        &:hover{
          background-color: $btnColorHover;
        }
        &:active{
          background-color: $btnColorActive;
        }
      }
      .btn-disabled{
        pointer-events: none;
        opacity: 0.5;
      }
      #article {
        font-size: 1em;
        font-weight: 700;
        margin: 15px;
      }
      #elem {
        font-size: 0.8em;
        margin: 0;
      }
      .wrong-email{
        border-color:red;
      }
    }
  }
</style>
