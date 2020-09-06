<template>
  <div class="drag-container" v-drag-and-drop:options="options">
    <h3>Total: {{this.itemList.length}} {{this.itemList}}</h3>
    <ul class="drag-list">
      <li class="drag-column" v-for="group in groups" :key="group.id">
        <span class="drag-column-header">
          <h2>{{ group.name }}</h2>
          <!-- <feather-icon type="more-vertical"></feather-icon> -->
        </span>
        <vue-draggable-group
          v-model="group.items"
          :groups="groups"
          :data-id="group.id"
          @change="onGroupsChange"
        >
          <ul class="drag-inner-list" :data-id="group.id">
            <li class="drag-item" v-for="item in group.items" :key="item.id" :data-id="item.id">
              <div class="drag-item-text">{{ item.name }}</div>
            </li>
          </ul>
        </vue-draggable-group>
      </li>
    </ul>

    <div class="add_newtask">
        <input type="text" v-model="newItem.name">
        <input type="text" v-model="newItem.groupId">
        <button @click="addNewTask(parseInt(newItem.groupId) - 1)">Add Task</button>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newItem: {
          id: '',
          name: '',
          groupId: ''
      },
      groups: [
        {
          id: 1,
          name: "Важные срочные",
          items: this.itemList=[]
        },
        {
          id: 2,
          name: "Важные несрочные",
          items: [
            // { id: 4, name: "Item 4", groupId: 2 },
            // { id: 5, name: "Item 5", groupId: 2 },
            // { id: 6, name: "Item 6", groupId: 2 },
          ]
        },
        {
          id: 3,
          name: "Неважные срочные",
          items: [
            // { id: 7, name: "Item 7", groupId: 3 },
            // { id: 8, name: "Item 8", groupId: 3 },
            // { id: 9, name: "Item 9", groupId: 3 },
            // { id: 10, name: "Item 10", groupId: 3 }
          ]
        },
        {
          id: 4,
          name: "Неважные несрочные",
          items: [
            // { id: 11, name: "Item 11", groupId: 4 },
            // { id: 12, name: "Item 12", groupId: 4 },
            // { id: 13, name: "Item 13", groupId: 4 },
            // { id: 14, name: "Item 14", groupId: 4 }
          ]
        }
      ],
      options: {
        dropzoneSelector: ".drag-inner-list",
        draggableSelector: ".drag-item"
      }
    };
  },
  methods: {
    onGroupsChange(e) {
      console.log({ e });
    },
    addNewTask(group_id){
        this.groups[group_id].items.push({
            id: this.itemList.length + 1,
            name: this.newItem.name,
            groupId: parseInt(this.newItem.groupId)
            
        })
        this.newItem.id = '',
        this.newItem.name = '',
        this.newItem.groupId = ''
    }
  },
};
</script>

<style>

* {
  box-sizing: border-box;
}

body {
  background: #33363d;
  color: white;
  font-family: "Roboto Mono", serif;
  font-weight: 300;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.drag-container {
  max-width: 1000px;
  margin: 20px auto;
}

.drag-list {
  display: flex;
  align-items: flex-start;

  @media (max-width: 690px) {
    display: block;
  }
}

.drag-column {
  flex: 1;
  margin: 0 10px;
  position: relative;
  background: rgba(black, 0.2);
  overflow: hidden;

  @media (max-width: 690px) {
    margin-bottom: 30px;
  }

  h2 {
    font-size: 0.8rem;
    margin: 0;
    text-transform: uppercase;
    font-weight: 600;
  }

  &-to-do {
    .drag-column-header,
    .drag-options {
      background: $to-do;
    }
  }

  &-in-progress {
    .drag-column-header,
    .drag-options {
      background: $in-progress;
    }
  }

  &-approved {
    .drag-column-header,
    .drag-options {
      background: $approved;
    }
  }
}

.drag-column-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  user-select: none;
}

.drag-inner-list {
  height: 85vh;
  overflow: auto;
}

.drag-item {
  margin: 10px;
  height: 100px;
  background: rgba(black, 0.4);
  transition: $ease-out;

  /* items grabbed state */
  &[aria-grabbed="true"] {
    background: #5cc1a6;
    color: #fff;
  }

  .drag-item-text {
    font-size: 1rem;
    padding-left: 1rem;
    padding-top: 1rem;
  }
}

.drag-header-more {
  cursor: pointer;
}

@keyframes nodeInserted {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 0.8;
  }
}

.item-dropzone-area {
  height: 6rem;
  background: #888;
  opacity: 0.8;
  animation-duration: 0.5s;
  animation-name: nodeInserted;
  margin-left: 0.6rem;
  margin-right: 0.6rem;
}
</style>

// TODO https://vivify-ideas.github.io/vue-draggable/example/#working-with-reactive-data
// TODO сделать счетчик тасков