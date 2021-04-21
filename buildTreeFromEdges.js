const edgeData1 = [
    [4,5],
    [5,3],
    [1,5],
    [2,1],
];
const edgeData2 = [
    [4,5],
    [5,3],
    [1,5],
    [2,5],
];

class Node {
    constructor(value) {

        this.value = value;
        this.children = [];
    }

    addChild(child) {
        this.children.push(child);
        return this;
    }
    
    listChildren() {
        return this.children;
    }

    value() {
        return this.value;
    }
}

/**
 * Takes in array of edges to build a tree, returning the root.
 * Assumes data is correct.
 * 
 * @param   {Array} edgeData  Array of edges.
 * @returns {Node}            Root node.
 */
function buildTreeFromEdges(edgeData) {
    
    const sortedEdgeData = edgeData.sort();
    const rootNode = new Node(1);
    const treeMap = new Map();
    treeMap.set(rootNode.value, rootNode);

    // Perform loop until each all nodes have been added to tree
    do {
        let currentEdge = sortedEdgeData.shift();
        let firstNode = currentEdge[0];
        let secondNode = currentEdge[1];

        // Check if a node from the current edge exists
        if (treeMap.has(firstNode)) {

            // Create new node using the other value in edge
            let newNode = new Node(secondNode);

            let nodeAlreadyInTree = treeMap.get(firstNode);

            nodeAlreadyInTree.addChild(newNode);

            treeMap.set(newNode.value, newNode);
            
        } else if (treeMap.has(secondNode)) {

            // Create new node using the other value in edge
            let newNode = new Node(firstNode);

            let nodeAlreadyInTree = treeMap.get(secondNode);

            nodeAlreadyInTree.addChild(newNode);

            treeMap.set(newNode.value, newNode);

        } 
        // Nodes in current edge do not exist yet in the tree,
        // look at the next edge and put the current one back
        else { 
            sortedEdgeData.push(currentEdge);
        }

    }
    while (sortedEdgeData.length > 0)

    return rootNode;
}
   
// Run script
( () => {
    buildTreeFromEdges(edgeData2)
})()