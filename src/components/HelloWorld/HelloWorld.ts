import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private lstAdded: Array<string> = [];

  onDragStart = (event: any) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  onDragOver = (event: any) => {
    event.preventDefault();
  };

  onDropInDropZone = (event: any) => {
    event.preventDefault();

    const id = event.dataTransfer.getData("text");
    const draggableElement = document.getElementById(id);
    const dropzone = event.target;

    var sourceClass = draggableElement?.className;
    var targetId = dropzone.id;
    var newNode = draggableElement?.cloneNode(true);
    var newEle = <HTMLElement>newNode;
    if (sourceClass) {
      var elementsOfSameType = document
        .getElementById(targetId)!
        .getElementsByClassName(sourceClass);

      newEle.id = `${newEle.id}_${elementsOfSameType.length + 1}`;
      newEle.addEventListener("dragstart", this.onDragStart);

      if (
        draggableElement?.parentElement?.id !== dropzone.parentElement.id &&
        draggableElement?.parentElement?.id != dropzone.id
      ) {
        dropzone.appendChild(newEle);
        this.lstAdded.push(newEle.id);
      }

      event.dataTransfer.clearData();
    }
  };

  onDropInItemZone = (event: DragEvent) => {
    event.preventDefault();
    const id = event.dataTransfer?.getData("text");
    if (id) {
      const element = document.getElementById(id);
      this.lstAdded = this.removeFromArray(this.lstAdded, id);
      element?.parentNode?.removeChild(<Node>element);
    }
  };

  private removeFromArray(array: Array<any>, element: any): Array<any> {
    var index = array.indexOf(element);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}
