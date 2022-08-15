import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  Type: string;
  Amount: string;
  items?: number;
  kind: string;
  puid: string;
  transid : string;
}

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  Wallet : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: BehaviorSubject<TreeNode<FSEntry>[]> = new BehaviorSubject<TreeNode<FSEntry>[]>([]);
  constructor() { }
}
