<template>
  <div id="app">
    <div class="comp-2-container">
      <table>
        <tr>
          <td colspan="2" id="td-id">№</td>
          <td colspan="2" id="td-name">ФИО</td>
          <td id="td-date">Дата рождения</td>
          <td class="table-sortBtn">
            <span v-if="!sortMinToMax.date" @click="onSort(1)">&#9660;</span>
            <span v-else @click="onSort(1)">&#9650;</span>
          </td>
          <td colspan="2" id="td-phone">Телефон</td>
          <td colspan="2" id="td-email">Email</td>
          <td id="td-distance">Дистанция забега</td>
          <td class="table-sortBtn">
            <span v-if="!sortMinToMax.distance" @click="onSort(0)">&#9660;</span>
            <span v-else @click="onSort(0)">&#9650;</span>
          </td>
          <td id="td-payment">Сумма взноса, руб.</td>
          <td class="table-sortBtn">
            <span v-if="!sortMinToMax.payment" @click="onSort(2)">&#9660;</span>
            <span v-else @click="onSort(2)">&#9650;</span>
          </td>
        </tr>
        <tr v-for="user in changeUserList" :key="user.id">
          <td colspan="2">{{user.id}}</td>
          <td colspan="2">{{user.name}}</td>
          <td colspan="2">{{user.date}}</td>
          <td colspan="2">{{user.phone}}</td>
          <td colspan="2">{{user.email}}</td>
          <td colspan="2">{{user.distance}}</td>
          <td colspan="2">{{user.payment}}</td>
        </tr>
      </table>
      <div class="pagination">
        <div class="back"  :class="{'hide' : !prBtn}" @click="previousPage">&#171;Back</div>
        <div :class="{'activePage' : page == activePage}" v-for="page in pagesAmount" :key="page" @click=" listPage(page)">{{page + 1}}</div>
        <div class="next" :class="{'hide' : !nextBtn}" @click="nextPage">Next&#187;</div>
      </div>
    </div>
  </div>
</template>

<script>
import { USERS, ReWriteUsers } from "../assets/def"
export default {
  name: 'app',
  data () {
    return {
      users: "",
      startInd: 0,
      listStep: 3,
      activePage: 0,
      prBtn: true,
      nextBtn: true,
      sortMinToMax : {
        distance : true,
        date : true,
        payment : true
      }
    }
  }, 
  computed: {
    changeUserList: function() { 
      this.users = this.$store.state.obj; 
      
      return  this.users.slice(this.startInd, this.startInd + this.listStep)
    },
    pagesAmount() {
      let arr = [];
      for(let i =0; i < Math.ceil(this.users.length / this.listStep); i++)
        arr.push(i);

      return arr;
    }
  },

  beforeCreate() {
    this.$store.commit("rewriteObject", USERS)
  },

  mounted() {
    this.listPage(0)
  },

  methods: {
    onSort(ind) {
      let sortingTable = this.$store.state.obj;
      let key = Object.keys(this.sortMinToMax)[ind];

      if(key != "date")
        if(this.sortMinToMax[key])
          sortingTable.sort(function(a, b){return b[key] - a[key]})
        else
          sortingTable.sort(function(a, b){return a[key] - b[key]})
      else 
        if(this.sortMinToMax[key])
            sortingTable.sort(function(a, b){
              let date1 = a[key].split('.'); 
              let date2 = b[key].split('.'); 
              return new Date(date1[2],date1[1],date1[0]) - new Date(date2[2],date2[1],date2[0])
            })
        else
          sortingTable.sort(function(a, b){
            let date1 = a[key].split('.'); 
            let date2 = b[key].split('.'); 
            return new Date(date2[2],date2[1],date2[0]) - new Date(date1[2],date1[1],date1[0])
          })

      this.sortMinToMax[key] = !this.sortMinToMax[key];
      this.$store.commit("rewriteObj", sortingTable) // в консоли unknown mutation type: rewriteObj, потому что здесь опечатка -> rewriteObject
    },

    nextPage() {
      this.listPage(this.activePage + 1)
    },

    previousPage() {
      this.listPage(this.activePage - 1)
    },

    listPage(num) {
      let pagesNum = this.pagesAmount;
      this.startInd = num * this.listStep;
      this.activePage = this.startInd / this.listStep;
      this.prBtn = !(num == pagesNum[0]);
      this.nextBtn = !(num == pagesNum[pagesNum.length - 1]);
    }
  }
}
</script>

<style lang="scss">
  $inputBgdColor : #61a64e;
  $tableBgdColorContainer : #7a7a7a;
  $tableBgdColor : rgb(223, 223, 223);
  $btnColor : #66935d;
  $fontColor : #3f3f3f;

  #app{
    color: $fontColor;
    .comp-2-container {
      margin: auto;
      padding: 15px;
      box-sizing: border-box;
      min-width: 1200px;
      height: 40vh;
      min-height: 210px;
      background-color: $tableBgdColorContainer;
      .pagination {
        display:flex;
        justify-content: center;
        div{
          width: 50px;
          height: 20px;
          border: 2px solid $tableBgdColorContainer;
          background-color: #c0c0c0;
          display:flex;
          justify-content: center;
          align-items: center;
          &:active {
            background-color: #9b9b9b;
          }
        }
        .back, .next {
          width: 70px;
        }
        .activePage {
            background-color: #6e6e6e;
        }
        .hide {
            opacity: 0;
            pointer-events: none;
        }
      }

      table{
        margin:auto;
        background-color: $tableBgdColor;
      }
      td{
        border: 2px solid #b3b3b3;
        text-align: center;
        vertical-align: middle;
        padding: 5px;
      }
      .table-sortBtn{
          padding: 0;
          background-color:  #b3b3b3;
          width: 10px;
          &:hover{
            background-color:  #c0c0c0;
            border: 2px solid #c0c0c0;
          }
      }
      #td-id {
        width: 50px;
      }
      #td-name {
        width: 27vw;
      }
      #td-date {
        width: 12.5vw;
        .table-td-span {
          width: 11vw;
        }
      }
      #td-phone {
        width:12.5vw;
      }
      #td-email {
        width: 28vw;
      }
      #td-distance {
        width: 8vw;
        .table-td-span {
          width: 7vw;
        }
      }
      #td-payment {
        width: 8vw;
        .table-td-span {
          width: 7vw;
        }
      }
    }
  }
</style>
