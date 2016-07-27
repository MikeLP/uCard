<div style="display: none;" class="welcome-container">
    <video class="video" loop autoplay muted>
        <!--videoname#t=0,51-->
        <source v-bind:src=video type=video/mp4>
    </video>

    <div class="grid-bg"></div>
    <div class="greeting">
        <div class="message">{{message}}</div>
        <div class="description">{{description}}</div>

        <button @click="hide" class="button">{{btn.text}}</button>
    </div>
</div>