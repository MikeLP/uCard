<section class="page cards-container">
    <list></list>
    <section v-bind:class="['card-container', card ? 'active-card' : '']">
        <map-area keep-alive=true ></map-area>
        <section v-if="card" class="container">
            <panel v-bind:panel="panel"></panel>
            <div class="content">
                <proclaimers v-bind:items="proclaimers"></proclaimers>
                <div>
                    card info
                </div>
            </div>
        </section>
    </section>
</section>
