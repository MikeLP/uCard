<div class="proclaimers">
    <div v-for="(item, index) of items" class="proclaimer">
        <div class="fullname">{{item.fullName}}</div>
        <div>Обрабатывался в период</div>
        <div>{{item.period}}</div>
    </div>
</div>