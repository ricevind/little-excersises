// type Question = object;
// type Recommendation = object;
//
// class QuestionTree {
//     private question: Question;
//     private yes: Question | null;
//     private no: Question | null;
//     private recommendation: Recommendation | null;
//
//     constructor(
//         question: Question,
//         recommendation: Recommendation | null = null
//     ) {
//         this.question = question;
//         this.yes = null;
//         this.no = null;
//         this.recommendation = recommendation;
//     }
//     insertChild(
//         question: Question,
//         side: string,
//         recommendation: Recommendation | null = null
//     ) {
//         const newQuestion = new QuestionTree(question, recommendation);
//         return side === 'yes'
//             ? (this.yes = newQuestion)
//             : (this.no = newQuestion);
//     }
//
//     // Uses a Depth-First Traversal
//     static traverse(tree, func = console.log) {}
//
//     contains(searchValue) {}
//
//     static size(tree) {}
//
//     static find(tree, value) {}
//
//     insert(parentTree: Question, value: T) {
//         const newTree = new Tree(value);
//         this.children.push(newTree);
//         return newTree;
//     }
//
//     remove(value: T) {
//         const isInChildren = this.children.find(tree => tree.value === value);
//     }
//
//     reorder(node1, node2) {}
// }
//
// export default Tree;
