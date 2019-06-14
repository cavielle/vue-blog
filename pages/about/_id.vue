<template>
  <div>
    <h2>About Id content</h2>
    <p>Id:{{ $route.params.id }}</p>
    <ul>
      <li>
        <a href="/about">about</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  validate({ params }) {
    return /\d+$/.test(params.id);
  },
  data() {
    return {
      title: this.$route.params.title
    };
  },
  created() {
      console.log(this.title)
  },
  head() {
    return {
        title:this.title,
        meta:[
            {hid:'description',name:'About',content:'This is about Ivan'}
        ]
    };
  }
};
</script>