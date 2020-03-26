<template>
  <div id="app">
    <router-view
      :editMode="editMode"
      :state="state"
      :apiToken="apiToken"
    ></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editMode: false,
      state: true,
      apiToken: ''
    }
  },
  mounted: function () {
    if(this.$route.fullPath.includes('/edit')){
      if(this.readCookie('apiToken') !== ''){
        this.editMode = true
        this.apiToken = this.readCookie('apiToken')
        console.log(this.apiToken)
      }else{
        const formData = new FormData();
        formData.append('username', 'test')
        formData.append('password', 'test')
        /*const formData = JSON.stringify({
          "username": "test",
          "password": "test"
        })*/
        fetch('http://localhost:8000/api/user/login', {
          method: 'POST',
          body: formData
        })
        .then((results) => results.json())
        .then(data => {
          console.log(data)
          if(typeof data.erreur !== 'undefined'){
            alert(data.erreur)
          }else{
            this.apiToken = data.token
            this.writeCookie('apiToken', this.apiToken, 7)
          }
        }).catch(function(err){
          alert(err)
        })
     }
    }
  },
  methods: {
    // Ecrire un Cookie
    writeCookie: function (name, value, days) {
      let date, expires;
      if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
      }else{
        expires = "";
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    },
    // Lire un Cookie
    readCookie: function(name) {
      let i, c, ca, nameEQ = name + "=";
      ca = document.cookie.split(';');
      for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
          c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          return c.substring(nameEQ.length,c.length);
        }
      }
      return '';
    },
  }
}
</script>
