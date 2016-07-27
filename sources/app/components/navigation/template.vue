<section style="display:none;" class="navigation-container">
    <div id="refresh-cards" class="icon ion ion-ios-sync-outline"></div>
    <nav class="list no-drag">
        <span v-bind:id="item.id" v-on:click="page(index)"
              v-bind:class="['item', index == activeItemIndex ? 'active' : '']" v-for="(item, index) of items">
            {{item.label}}
        </span>
    </nav>
</section>
