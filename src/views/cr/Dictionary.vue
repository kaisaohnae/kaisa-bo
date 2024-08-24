<template>
  <form class="search" @submit="getList" @keyup.enter="getList">
    <fieldset>
      <legend>검색</legend>
      <table>
        <colgroup>
          <col width="100"/>
          <col width="*"/>
          <col width="100"/>
          <col width="*"/>
        </colgroup>
        <tbody>
        <tr>
          <th>약어</th><!-- class="required"-->
          <td colspan="2"><input type="text" v-model="search.abb"/></td>
        </tr>
        </tbody>
        <tbody class="audit" v-show="data.audit">
        <tr>
          <th>수정기간</th>
          <td colspan="2">
            <SelectGroupDate
              :name="['startUpdateDt', 'endUpdateDt']"
              :format="'YYYY-MM-DD'"
              :date="[search.startUpdateDt, search.endUpdateDt]"
              @set-start-date="(o: any) => {
                  search.startUpdateDt = o.date;
                }"
              @set-end-date="(o: any) => {
                  search.endUpdateDt = o.date;
                }"
            />
          </td>
        </tr>
        <tr>
          <th>등록일</th>
          <td colspan="2">
            <SelectDate
              :name="['createDt']"
              :format="'YYYY-MM-DD'"
              :date="[search.createDt]"
              @set-start-date="(o:any) => {
                  search.createDt = o.date;
                }"
            />
          </td>
        </tr>
        <tr>
          <th>수정ID</th>
          <td><input type="text" v-model="search.updater"/></td>
          <th>등록ID</th>
          <td><input type="text" v-model="search.creator"/></td>
        </tr>
        </tbody>
      </table>
    </fieldset>
    <div class="btnWrap">
      <span class="crud">
        <button type="button" class="button add" @click="add"><span class="icon">&#xe813;</span>추가</button>
        <button type="button" class="button del" @click="del"><span class="icon">&#xe815;</span>삭제</button>
        <button type="button" class="button save" @click="save"><span class="icon">&#xe814;</span>저장</button>
      </span>
      <button type="button" class="audit" @click="data.audit = !data.audit">상세조회</button>
      <button type="submit" class="button3"><span class="icon">&#xe096;</span></button>
      <button type="reset" @click="gridUtil.reload()"><span class="icon">&#x22;</span></button>
      <button type="button" class="button excel" @click="gridUtil.excelExport(data.grid, '사전')"><span class="icon">&#xf1c3;</span>
      </button>
      <div class="totalCount">총 {{ data.totalCount }}건</div>
    </div>
  </form>
  <div id="grid"></div>
</template>
<script setup lang="ts">
import {onMounted, ref, reactive} from 'vue';
import Grid from 'tui-grid';
import DictionaryService from '@src/service/cr/DictionaryService';
import SelectDate from '@src/components/SelectDate.vue';
import SelectGroupDate from '@src/components/SelectGroupDate.vue';
import gridUtil from '@src/utils/gridUtil';

const search = reactive({
  abb: '',
  ...gridUtil.searchProps
});
const data = reactive({
  required: ['abb', 'korean', 'english'],
  grid: {} as Grid,
  totalCount: 0,
  list: [] as any,
  audit: false,
});
const getList = () => {
  data.totalCount = 0;
  DictionaryService.getDictionaryList(search).then(
    (res: any) => {
      data.list = res.data?.list;
      data.totalCount = res.data?.totalCount;
      data.grid.resetData(data.list, {});
    },
    (err) => {
      console.log(err);
    },
  );
}
const add = () => {
  //gridUtil.add(data.grid)

  data.grid.appendRow({}, {at: 0});


}

const del = () => {
  gridUtil.del(data.grid);
}
const save = () => {
  const saveList = gridUtil.save(data.grid, data.required) as any;
  if(saveList.length > 0) {
    DictionaryService.setDictionaryList(saveList).then(
      (res) => {
        getList();
      },
      (err) => {
        console.error(err);
      },
    );
  }
}
onMounted(() => {
  data.grid = new Grid({
    el: document.getElementById('grid') as HTMLElement,
    //rowHeaders: ['checkbox'],
    columns: [
      {
        header: '약어',
        name: 'abb',
        sortable: true,
        disabled: true,
        align: 'left',
        validation: {dataType: 'string', required: true}
      },
      {header: '한국어', name: 'korean', hidden: false, editor: 'text', validation: {dataType: 'string', required: true}},
      {header: '영어', name: 'english', editor: 'text', validation: {dataType: 'string', required: true}},
      {header: '설명', name: 'memo', editor: 'text', validation: {dataType: 'string', required: false}},
      {header: '등록자', name: 'creator', hidden: false, defaultValue: '', width: 150},
      {header: '등록일시', name: 'createDt', disabled: true },
      {header: '수정자', name: 'updater', hidden: false, defaultValue: '', width: 150, editor: 'text', disabled: true},
      {header: '수정일시', name: 'updateDt', disabled: true },
    ],
    ...gridUtil.defaultProps
  });
  getList();
});
</script>
