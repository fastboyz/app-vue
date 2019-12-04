import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  onDragStart = (event: any) => {
    console.log("is is the on drag start");
    event
    .dataTransfer
    .setData('text/plain', event.target.id);
  }

  onDragOver = (event: any) => {
    console.log("is int the drag over");
    event.preventDefault();
  }

  onDrop = (event: any) => {
    console.log("is int the onDrop");
    const id = event
      .dataTransfer
      .getData('text');

    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    dropzone.appendChild(draggableElement);

    event
      .dataTransfer
      .clearData();
  }

  // onDragStart(event) {
  //   event
  //     .dataTransfer
  //     .setData('text/plain', event.target.id);

  //   event
  //     .currentTarget
  //     .style
  //     .backgroundColor = 'yellow';
  // }
}