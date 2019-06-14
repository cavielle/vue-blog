<template>
    <div>
        <h2>About Index Page</h2>
    <ul>
        <li><nuxt-link to="/">home</nuxt-link></li>
        <li><nuxt-link :to="{name:'about-id',params:{id:131231,title:'AboutIvan'}}">131231</nuxt-link></li>
        <li><nuxt-link :to="'/about/'+ 'cavielle'">cavielle</nuxt-link></li>
        <li>
        <nuxt-link :to="{name:'index-article-id',params:{id:131231,title:'【ivan Blog】'}}">【这是标题】这是标题这是标题，这是标题这是标题这是标题这是标题。这是标题这是标题。</nuxt-link>

        </li>
        
    </ul>
    </div>
</template>

