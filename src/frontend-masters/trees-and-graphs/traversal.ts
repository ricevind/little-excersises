const son = {
    name: 'Sammy',
    children: [{ name: 'Bowser', children: [{ name: 'P' }] }],
};
const daughter = { name: 'Alex' };
const mother = { name: 'Ashlegh', children: [son, daughter] };

function traverse(tree: any) {
    console.log(tree.name);
    if (tree.children) {
        tree.children.forEach((child: any) => traverse(child));
    }
}

traverse(mother);
