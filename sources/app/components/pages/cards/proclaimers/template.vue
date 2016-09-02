<div class="proclaimers no-drag">
  <div v-if="items.length > 0" class="list">
    <div v-for="(item, index) of items" class="proclaimer">
        <div class="fullname">
          <span>{{item.fullName}}</span>
          <span class="label" v-if="item.isPioneer">пионер</span>
        </div>
        <div class="info">
          <span v-if="item.ProclaimerCard.period">
            Участок был обработан за {{item.ProclaimerCard.period}}
          </span>
          <span v-else>
            Участок в обработке
          </span>
        </div>
        <div class="period">
          <span>с {{item.ProclaimerCard.date.first()}}</span>
          <span v-if="item.ProclaimerCard.endDate">
            по {{item.ProclaimerCard.date.last()}}
          </span>
          <span v-else>
            Участок в обработке
          </span>
        </div>
    </div>
    <div title="Показать всю историю карточки" class="more">
      <div class="icon ion-ios-more-outline"></div>
    </div>
  </div>
  <div v-else class="empty">
      Участок<br/> не обработан
  </div>
</div>
