import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  onDragStart = (event: any) => {
    console.log("is is the on drag start");
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  onDragOver = (event: any) => {
    console.log("is int the drag over");
    event.preventDefault();
  };

  onDrop = async (event: any) => {
    event.preventDefault();
    console.log("is int the onDrop");

    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    var sourceClass = draggableElement!.className;
    var targetId = dropzone.id;
    var newNode = draggableElement!.cloneNode(true);
    var newEle = <HTMLElement>newNode;
    var elementsOfSameType = document
      .getElementById(targetId)!
      .getElementsByClassName(sourceClass);

    console.log(`${sourceClass}`);
    newEle.id = `${newEle.id}_${elementsOfSameType.length + 1}`;
    newEle.addEventListener("dragstart", this.onDragStart);

    dropzone.appendChild(newEle);

    event.dataTransfer.clearData();
  };
}
