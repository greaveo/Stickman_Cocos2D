import { instantiate } from "cc";
import {  Node } from 'cc';
import { IObjectPool } from "./IObjectPool";

export class ObjectPool<T extends Node> implements IObjectPool<T> {
    private unusedNods: T[] = [];
    private prefab: T;
    private parent: Node;

    constructor(prefab: T, parent: Node, initialSize: number = 5) {
        this.prefab = prefab;
        this.parent = parent;
        this.Add(initialSize);
    }

    public Get(): T {
        if (this.unusedNods.length <= 0) {
           this.Add(1);
        }

        return this.unusedNods.pop();
    }

    public Put(obj: T) {
        obj.active = false;
        this.unusedNods.push(obj);
    }

    private Add(amount: number) {
        for (let index = 0; index < amount; index++) {
            var newObj = instantiate(this.prefab) as T;
            newObj.parent = this.parent;
            this.Put(newObj);
        }
    }

    public Clear() {
        this.unusedNods.forEach(element => {
            element.destroy();
        });
        this.unusedNods = [];
    }
}
