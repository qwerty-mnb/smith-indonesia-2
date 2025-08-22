<template>
  <div class="text-center p-3">
    <div class="board-container board-head row">
      <div class="col-9">
        {{ $t("table.Subject") }}
      </div>
    </div>
    <div class="board-elevation" v-for="term in terms" :key="term">
      <div class="board-summary" @click="viewSelectedTerms(term.id)">
        <div class="board-content">
          <div class="board-wrapper">
            <div class="row m-0">
              <div class="col-12 board-item">
                <span class="board-type">{{ $t("header.TermsCondition") }}</span>
                <span class="text-dark">★☆★ {{ term.title }} ★☆★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="board-body"  v-if="isOpen && selectedTerm === term.id">
        <img v-if="term.imgsrc !== ''" class="img img-responsive notice-img" :src="term.imgsrc" width="200" />
        <div v-else class="inner-container" style="position: relative">
          <QuillEditor toolbar="#my-toolbar" :content="term.body" readonly="true" theme="snow"
            class="quillview-height" v-if="term.type === 'TEXT'" :key="term.id" />
          <div id="my-toolbar" v-if="term.type === 'TEXT'">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import  ApiService from "@/services/ApiService";

interface ITerm {
  id: number;
  type: string;
  title: string;
  body: string;
  imgsrc: string;
}

export default defineComponent({
  name: "TermsCondition",
  components: {
    QuillEditor,
  },
  setup() {
    const selectedTerm = ref(0);
    const isOpen = ref(false);
    const terms: any = ref<Array<ITerm>>([]);

    const viewSelectedTerms = (termId: number) => {
      selectedTerm.value === termId ? isOpen.value = !isOpen.value : isOpen.value = true;
      selectedTerm.value = termId;
    };

    const getManual = async () => {
      const results: ITerm[] = await ApiService.get(`/site/manuals`)
        .then((res) => res.data)
        .catch(() => []);
      
     terms.value.splice(0, terms.value.length, ...results);
    }

    onMounted(() => getManual());

    return {
      selectedTerm,
      isOpen,
      terms,
      viewSelectedTerms,
    };
  },
});
</script>