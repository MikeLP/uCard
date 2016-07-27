<section class="control-panel-container">
    <nav class="panel">
        <span v-bind:title="btn.title" v-on:click="emitEvent(btn.event)" v-bind:class="btn.class" v-for="(btn, index) in panel.items"></span>
    </nav>
</section>