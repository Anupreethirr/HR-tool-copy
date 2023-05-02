import { HttpClient } from '@angular/common/http';
import { ParseFlags } from '@angular/compiler';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive'
import { RouterStateSnapshot } from '@angular/router';
import { TreeNode, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Product } from './product';
import { ProductListDemo } from './productlistdemo';
import { Observable } from 'rxjs';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService, MessageService]
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  constructor(private messageService: MessageService, public dialogService: DialogService, private http: HttpClient) {
    this.runID = Math.floor(Math.random() * 6);

  }

  //SCROLL TO BOTTOM
  ngAfterViewChecked() {
    this.scrollToBottom();
  }



  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  selectedEvent!: Event;
  data1: TreeNode[] = [] as any;
  data: TreeNode[] = [] as any;
  data2!: TreeNode[];
  horizontalOptions: any;
  selectedNode!: any;
  position!: string;
  displayPosition: boolean = true;
  count = 0;
  temparr: TreeNode[] = [];
  resparr: TreeNode[] = [] as any
  sstyle = "{width: '10vw,background-color:transparent}";
  split: { title: string, code: string }[] = [] as any;
  enableStyle: any = { "color": "#5895b5", "font-weight": "700" };
  disableStyle: any = { "color": "grey", "font-weight": "700" };
  enable: any = "";
  enablefwd: any = "";
  enablenxt: any = "";
  enablePly: any = "";
  enablePrv: any = "";
  enableFbkw: any = "";
  splitValueSelected: boolean = false;
  firstPlay: number = 0;

  selectedCity!: { title: string, code: string };
  selectedsplit!: [{ split: { key: String, value: any } }];
  splitValue!: any;

  products: { feature: string, value: string, gini: number }[] = [{ feature: 'Age', value: '<30', gini: 0.32 }, { feature: 'Gender', value: 'Female', gini: 0.27 }, { feature: 'CTC', value: '>6000000', gini: 0.23 }];


  FromDateList: any[] = [{ date: "01/19" }, { date: "01/20" }, { date: "01/21" }, { date: "01/22" }, { date: "01/23" }];
  FromselectedDate!: { date: string };
  toSelectedDate!: { date: string };
  selectedNodeofTree: string = "Select Feature and Split Values ";
  range!: [{ date: string }, { date: string }];

  feature: any = "None";



  //GET VAL FROM SELECTED SPLIT
  getval(event: Event) {
    console.log(event,"gtval event");
    console.log(this.selectedsplit,"selected split");
    let flag = this.data1[0] as any;
    ///submit api call takes place

    this.messageService.add({ severity: 'success', summary: 'split Selected', detail: this.splitValue + "" });

    // this.onNodeSelect(this.selectedEvent)
  }



  getSplitVal(event: Event) {
    // let splitval=this.selectedsplit.splitva;
    // [split:{key:String,value:number}]


    console.log(this.selectedsplit,"selected split")
  }


  getFeature(event: Event) {
    this.feature = "None";
    // let flag=this.data1[0] as any;
    // flag.children.push({
    //   label: 'LOS',
    //  type: 'person',
    //  styleClass: 'p-person',
    //  expanded: false,
    //  data: {title:'',id:'1.1'}})

    if (this.selectedFeature.value != this.feature) {
      this.splitList = this.selectedFeature.value
      this.feature = "Val"
    }
    // this.featureList.map((a:any)=>{
    //   if(a.feature==this.selectedFeature)
    //   {
    //     console.log(a.value)
    //     return a.value;
    //   }

    // })

  }

  showSpinner: boolean = false;
  splitList!: any[];
  arr: [] = [] as any;

  ngOnInit() {

    this.enablefwd = this.enableStyle;
    this.enablenxt = this.disableStyle
    this.enablePly = this.enableStyle;
    this.enablePrv = this.disableStyle;
    this.enableFbkw = this.disableStyle;

    this.getRunKey();
    this.scrollToBottom();
    this.showSelectYearDialog()
    //   this.data1=  [{
    //     label: 'Total Employees',
    //     type: 'person',
    //     styleClass: 'p-person',
    //     expanded: false,
    //     data: [{title:'1762',id:0}],
    // }]

    this.getAllFeatures();
  }


  getfromyear(eve: any) {
    this.range = [this.FromselectedDate, this.toSelectedDate]
  }
  gettoyear(eve: any) {
    this.range = [this.FromselectedDate, this.toSelectedDate]
  }
  submitYear() {
    this.on();
    this.displayselectedYearModal = false;
    this.range = [this.FromselectedDate, this.toSelectedDate]
    this.showSpinner = true;
    this.getAllUIDetail();
  }
  nodeNumber!: number;

  onNodeSelect(event: any) {
    console.log(this.messageService);
    console.log(event.node);
    this.enablefwd = this.disableStyle;
    this.enablenxt = this.disableStyle
    this.enablePly = this.disableStyle;
    this.enablePrv = this.disableStyle
    this.enableFbkw = this.disableStyle;
    // this.on();
    if (event.node.children == undefined && event.node.node != 1) {
      this.messageService.add({ severity: 'success', summary: 'Node Selected', detail: event.node.label });
      console.log(event.node.recom_feat)
      this.enablefwd = this.disableStyle;
      this.enablePly = this.enable;
      this.enablenxt = this.disableStyle

      this.enablePrv = this.disableStyle;
      this.enableFbkw = this.disableStyle;
      this.products = event.node.recom_feat;

      // this.selectedNodeofTree="Select Features and Split value for "+event.node.label

      this.showModalDialog()

    }
    else {
      if (event.node.node == 1) {
        this.messageService.add({ severity: 'error', summary: 'No action can be taken on selected node', detail: " Proceed with play or forward button" });
        this.enablefwd = this.enable;
        this.enablePly = this.enable;
      }
      else {
        this.enablePrv = this.enableStyle;
      }
    }
    this.nodeNumber = event.node.node;
    this.selectedEvent = event;
    //  if(event.node.data.id==1.1)
    //  {
    //   this.data1[0].children=this.xxx;
    //   this.data1[0].children[0].children=this.child1
    //  }

  }

  // showPositionDialog('right')

  showPositionDialog(position: string) {
    this.position = "top-right";
    this.displayPosition = true;
  }
  enableY: boolean = false;

  disableYear() {
    this.enableY = false;
  }
  enableYear() {
    this.enableY = true;
  }
  i: number = 0;
  // nextItem() {
  //   this.i = this.i + 1; // increase i by one
  //   this.i = this.i % this.data.length; // if we've gone too high, start from `0` again
  //   this.data1=[];
  //   return this.data1.push(this.data[this.i]); // give us back the item of where we are now
  // }
  playCount = 2;

  pushSingleNode(response: any) {
    let totalemp = response as any;
    this.data = totalemp.data;
    this.data1 = [];
    this.data1.push(this.data[1])
  }
  pushSingleNodearr(response: any) {
    let totalemp = response as any;
    this.data = totalemp.data;
    this.data
    this.data1 = [];
    let x = this.data[1].label;
    let z = this.data[1];
    if (x != undefined)
      z.label = x[0] as any;
    this.data1.push(z)
  }
  //ON LOAD CALL
  onStart() {
    this.http.get
      ("https://hrtoolfffb.azurewebsites.net/start_api?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date)
      .subscribe(response => {
        console.log(response,"response")
        // console.log(response)
        this.pushSingleNode(response);

        this.getRunKey();
        this.off();

      }


      )

  }
  getYearList() {
    this.http.get("https://exitdate.azurewebsites.net/Date_of_exit")
      .subscribe(response => {
        console.log(response)
        // console.log(response)

      }
      )
  }



  runIdNext!: any;

  fastFwd() {

    this.enablefwd = this.disableStyle;
    this.enablenxt = this.disableStyle
    this.enablePly = this.disableStyle;
    this.enablePrv = this.disableStyle;
    this.enableFbkw = this.enableStyle;
    this.on();
    this.http.get<{ RunID: number, data: [any] }>
      ("https://hrtoolforback.azurewebsites.net/fast_forward_api?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date,
      ).subscribe(response => {
        console.log(response,"fwd response")
        this.parseDataToTree(response);
        // let resp=[] as any;
        this.runIdNext = response.RunID;
        this.getRunKey();
        this.off();
      })
    // this.data.reverse();
    // for(let i=0;i<=this.count;i++)
    // {
    //   let newarr=this.data[0].children
    // }


  }

  fastbkw() {
    this.enablefwd = this.enableStyle;
    this.enablenxt = this.disableStyle
    this.enablePly = this.enableStyle;
    this.enablePrv = this.disableStyle;
    this.enableFbkw = this.disableStyle;
    this.on();
    this.http.get<{ RunID: number, data: [any] }>
      ("https://hrtoolforback.azurewebsites.net/fast_backward_api?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date,
      ).subscribe(response => {
        console.log(response,"fast backward")
        // this.parseDataToTree(response);
        this.pushSingleNodearr(response)
        // let resp=[] as any;

        this.getRunKey();
        this.off();
      })
    // this.data.reverse();
    // for(let i=0;i<=this.count;i++)
    // {
    //   let newarr=this.data[0].children
    // }


  }
  /**
   * The function sends an HTTP GET request to a specific API endpoint and parses the response data
   * into a tree format.
   */
  next() {

    this.on();
    this.http.get<{ RunID: number, data: [any] }>
      ("https://hrtoolforback.azurewebsites.net/forward_api?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date + "&forward_count=" + this.playCount,
      ).subscribe(response => {
        console.log(response)
        this.parseDataToTree(response);
        // let resp=[] as any;
        this.playCount++;
        this.runIdNext = response.RunID;
        this.getRunKey();
        this.off();
      })

    //  CODE MIGHT BE USED FOR LATER
    // console.log(this.i,this.data.length-1)
    // if(this.i!=this.data.length-1) 
    // {
    //   this.nextItem();
    // }
    // else

    // {
    //   this.messageService.add({severity: 'info', summary: 'Exceeded limit of Next'});

    // }
  } 
  
  /**
   * This function handles the logic for going to the previous node in a tree and making an HTTP
   * request to retrieve data.
   */
  prev() {
    this.playCount--;
    if (this.playCount <= 1) {
      this.enablefwd = this.enableStyle;
      this.enablenxt = this.enableStyle
      this.enablePly = this.disableStyle;
      this.enablePrv = this.disableStyle;
      this.enableFbkw = this.disableStyle;
    }
    this.on();
    if (this.nodeNumber != undefined) {
      this.http.get<{ RunID: number, data: [any] }>
        (" https://hrtoolforback.azurewebsites.net/back_node_delete?node=" + this.nodeNumber + "&runid=" + this.runIdNext,
        ).subscribe(response => {
          console.log(response,"prev ")
          this.getRunKey();

          if (this.playCount > 1) {
            this.parseDataToTree(response);

          }
          else {
            this.pushSingleNodearr(response)
          }
          // let resp=[] as any;

          console.log(this.playCount);
          this.off();

        })
    }
    else {
      this.http.get<{ RunID: number, data: [any] }>
        ("https://hrtoolforback.azurewebsites.net/backward_api?runid=" + this.runIdNext + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date,
        ).subscribe(response => {
          console.log(response)
          this.getRunKey();
          if (this.playCount > 1) {
            this.parseDataToTree(response);
          }
          else {
            this.pushSingleNodearr(response)
          }
          // let resp=[] as any;
          console.log(this.playCount);
          this.off();
        })
    }
  }
/**
 * The function handles the click event for the play button and either plays the video for the first
 * time or resumes it from a paused state.
 */
  onplayClick() {
    this.firstPlay++;
    this.enablefwd = this.disableStyle;
    this.enablenxt = this.enableStyle
    this.enablePly = this.disableStyle;
    this.enablePrv = this.enableStyle;
    this.enableFbkw = this.disableStyle;
    this.on();
    if (this.splitValueSelected) {
      this.playForSplitValue()
      this.splitValueSelected = false;
    } else {
      this.playForFirstTime();
    }
    // console.log(this.data1)
    // this.data1=[];
    // this.data1.push(this.data[1])
    // console.log(this.data);
  }

/**
 * The function sends an HTTP GET request to a specific API endpoint, parses the response data into a
 * tree structure, retrieves a run key, and sets a variable to the next run ID.
 */
  playForFirstTime() {
    this.http.get<{ RunID: number, data: [any] }>
      ("https://hrtoolforback.azurewebsites.net/forward_api?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date + "&forward_count=1",
      ).subscribe(response => {
        console.log(response)
        this.parseDataToTree(response);
        // let resp=[] as any;
        this.getRunKey()
        this.runIdNext = response.RunID;
        this.off();
      })

  }
/**
 * The function sends an HTTP GET request to a specific API endpoint with selected feature, split
 * value, node, and run ID parameters, and then parses the response data to a tree structure.
 */
  playForSplitValue() {
    if (this.selectedsplit != undefined && this.selectedsplit.length >= 1) {
      this.splitValue = this.selectedsplit.map((a) => a.split.value);
    }
    console.log(this.selectedFeature.feature)
    this.http.get<{ RunID: number, data: [any] }>
      ("https://hrtoolforback.azurewebsites.net/play_manual_api?feature=" + this.selectedFeature.feature + "&feat_value=[" + this.splitValue + "]&node=" + this.selectedNode.node + "&runid=" + this.runIdNext,
      ).subscribe(response => {
        this.splitValue = [];
        this.selectedsplit = [] as any;
        console.log(response)
        this.runIdNext = response.RunID;
        this.parseDataToTree(response);
        // let resp=[] as any;
        this.getRunKey()
        this.runIdNext = response.RunID;
        this.off();
      })
  }

 
  /**
   * The function takes a response object and parses it into a tree structure.
   * @param {any} response - The parameter "response" is an object that contains data to be parsed into
   * a tree structure. The code is attempting to parse the data and create a tree structure with nodes
   * and children.
   */
  
  parseDataToTree(response: any) {
    this.data = [] as any;
    this.temparr = response.data
    let resp = this.temparr[1];
    resp.children = [this.temparr[2], this.temparr[2 + 1]];
    this.data.push(resp)
    this.resparr = this.data;
    let x = 2;
    for (let i = x; i <= this.temparr.length; i++) {
      if (this.temparr[i].label != undefined) {
        let u = 'undefined';
        let val1 = this.temparr[i * 2]
        let val2 = this.temparr[i * 2 + 1]
        let child1: TreeNode<any>, child2: TreeNode<any>;
        resp = this.temparr[i];
        if (val1 != u) {
          // if(val1!=undefined){
          console.log(this.temparr[i * 2]);
          child1 = val1;
          i * 2 >= this.temparr.length ? x = 0 : x = i * 2;
          if (child1 != undefined) {
            resp.children = [child1];
          }
          // }
          //  this.data[this.data.length-1].children?.push(resp)
        }
        if (val2 != u) {
          // if(val2!=undefined){
          console.log(this.temparr[i * 2]);
          child2 = val2;
          (i * 2) + 1 >= this.temparr.length ? x = 0 : x = i * 2 + 1;
          if (child2 != undefined) {
            resp.children?.push(child2);
          }
          // this.data[this.data.length-1].children?.push(resp)
          // }
        }
        if (resp.children?.values != undefined) {
          this.data.push(resp);
        }
        //    this.resparr.push(resp);
        //   let yyyyy= this.resparr[this.resparr.length-1].children;
        //   this.resparr[this.resparr.length-1].children?.forEach(element => {
        //   if(element==child1)
        //   {
        //     this.resparr[this.resparr.length-1].children?.pop();
        //     this.resparr[this.resparr.length-1].children?.push(element,resp);
        //   }if(element==child2)
        //   {
        //     this.resparr[this.resparr.length-1].children?.pop();
        //     this.resparr[this.resparr.length-1].children?.push(element,resp);
        //   }
        //  });
        console.log("this.resparr.push(resp)", this.resparr);
        console.log("data", this.data)
      }
      if (x == 0) {
        console.log("Printing child", this.data[0].children)

        break;
      }
    }
    console.log(resp)
    this.data1 = [];
    this.data1 = this.data;
  }

  runID!: number;
  async getRunKey(): Promise<any> {

    this.http.get<{ nextRunId: number }>
      ("https://getrunkey.azurewebsites.net/getRunkey",
      ).subscribe(response => {
        console.log(response)
        // "total_emp":1762,"emp_left":510,"attritation_rate":28.94,"data
        // this.=rList.list;
        // console.log( this.featureList)
        this.runID = Number(JSON.stringify(response.nextRunId));
      })

  }


  splitfun(title: string): string {
    if (title != "Total Employees") {
      console.log(title.split('#')[0]);
      return title.split('#')[0];
    }
    else {
      return title;
    }
  }


  onNodeExpand(event: any) {
    console.log(event);
    event.node.expanded = false;
  }
  onNodeCollapse(event: any) {
    console.log(event);
    event.node.expanded = true;
  }

  prevItem() {
    if (this.i === 0) { // i would become 0
      this.i = this.data.length; // so put it at the other end of the array
    }
    this.i = this.i - 1; // decrease by one
    this.data1 = [];
    return this.data1.push(this.data[this.i]); // give us back the item of where we are now
  }

  featureList: [feature: string, value: []] = [] as any;
  selectedFeature!: { feature: string, value: [] };
  ref!: DynamicDialogRef;
  totalemp!: string;
  emp_left!: string;
  attration_rate!: string;

  getAllFeatures() {
    this.http.get
      ("https://hrtoolforback.azurewebsites.net/get_features",
      ).subscribe(response => {
        console.log(response)
        // "total_emp":1762,"emp_left":510,"attritation_rate":28.94,"data
        // this.=rList.list;
        // console.log( this.featureList)
        let rList = response as { "list": [feature: string, value: []] }
        this.featureList = rList.list;
        // let cc={feature:"Grade",value:[{"split":"E1"},{"split":"E2"},{"split":"E3"},{"split":"C"},{"split":"T3"},]};
        // this.featureList.push(cc as any);
        console.log(this.featureList)
      })
  }


  // getAllUIDetail()
  // {
  //   this.http.get("https://attritionapi.azurewebsites.net/hrtool"
  //   ).subscribe(response=> {
  //     console.log(response)
  //     let totalemp=response as any;
  //     this.totalemp=totalemp.total_emp;
  //     this.emp_left=totalemp.emp_left;
  //     this.data=totalemp.data;

  //   })
  // }
  //ON LOAD FUCNTION CALL
  getAllUIDetail() {
    this.http.get(
      "https://hrtoolfffb.azurewebsites.net/employee_summary?runid=" + this.runID + "&start_date=" + this.FromselectedDate.date + "&end_date=" + this.toSelectedDate.date
    ).subscribe(response => {
      console.log(response);
      let totalemp = response as any;
      this.runIdNext = totalemp.RunID;
      this.totalemp = totalemp.total_emp;
      this.emp_left = totalemp.emp_left;
      this.data = totalemp.data;
      this.attration_rate = totalemp.attritation_rate;
      // let resp=[] as any;

    })
    this.onStart();
    // this.data.reverse();
    // for(let i=0;i<=this.count;i++)
    // {
    //   let newarr=this.data[0].children
    // }

  }
  submit() {
    this.enableY = false;
    this.splitValueSelected = true;
    this.displayModal = false;
    // this.http.post("https://splittreehr.azurewebsites.net/splitTree",
    //   {"feature": this.selectedFeature.feature,
    //   "value": this.selectedsplit.split}).subscribe(response=> {
    //     console.log(response)
    //   })
  }


  show() {
    this.ref = this.dialogService.open(ProductListDemo, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" },
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  displayModal!: boolean;
  displayselectedYearModal!: boolean;
  showModalDialog() {
    this.displayModal = true;
    this.playCount++;
  }
  showSelectYearDialog() {
    this.displayselectedYearModal = true;
  }
  on() {
    (document.getElementById("overlay") as HTMLInputElement).style.display = "block";
  }
  off() {
    (document.getElementById("overlay") as HTMLInputElement).style.display = "none";
  }
}



//: for deleting selected node 
//: https://hrtoolforback.azurewebsites.net/play_manual_api?feature=Gender_enc&feat_value=0&node=6&runid=20001