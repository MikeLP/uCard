<section class="card-list-container no-drag">
    <div class="search-container">
        <input type="search"
               v-model="searchQuery"
               v-on:keyup.enter="search"
               class="search"
               placeholder="Поиск"
               onblur="this.placeholder = 'Поиск'"
               onfocus="this.placeholder = ''"
               list="street_list"
               autocomplete="on"
        />
        <span v-on:click="clearSearch" class="icon ion ion-ios-backspace-outline"></span>
        <!--<datalist id="street_list">-->
            <!--<option v-for="street of streets" v-bind:value="street">-->
        <!--</datalist>-->
    </div>
    <div id="card-list" class="cards-list">
        <div v-for="(item, index) of items" v-on:click="select($event, index)"
             v-on:contextmenu="showContextMenu($event, index)"
             v-bind:class="['item', activeIndex === index ? 'active': '']">
            <span class="label">УЧАСТОК {{item.number}}</span>
            <span class="place">{{item.name}}</span>
            <div class="date">{{item.updatedAt}}</div>
        </div>
    </div>
</section>
