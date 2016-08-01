<section class="page cards-container">
    <list></list>
    <section v-bind:class="['card-container', card ? 'active-card' : '']">
        <map-area keep-alive></map-area>
        <panel v-if="card" v-bind:panel="panel"></panel>
    </section>
</section>