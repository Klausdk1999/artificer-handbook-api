//import { Voucher } from '@prisma/client';
//import voucherRepository from '../repositories/projectRepository';
import { PrismaClient } from '@prisma/client';
import { array } from 'joi';
import internal from 'stream';
import { conflictError } from '../utils/errorUtils';

// export type VoucherCreateData = Omit<Voucher, 'id'>;
// export interface VoucherApplyData {
//   code: string;
//   amount: number;
// }
/// logica tendo os angulos
async function calcPieces(base:number, left:number,
 top:number , right:number, angle:number,angleLocation:string) {
  let arrSides = [base,left,top,right];
  // let rotatedSides=[0,0,0,0]
  // let arrAngles = ["baseLeft","topLeft","topRight","baseRight"];
  //angle location: base-left,base-right,top-left,top-right
  // let rotations =0;
  // for(let a=0;a<4;a++){
  //   if(angleLocation===arrAngles[a]){
  //     rotations=a;
  //   }
  // }
  // for(let i=0;i<arrSides.length;i++){
  //   let move=i+rotations;
  //   if(move>arrSides.length){
  //     move=move-4;
  //   }
  //   rotatedSides[move]=arrSides[i];
  // }

  let hashAngles={}
  hashAngles[angleLocation]=angle;

  let piece={
    side:"base",
    leftBaseAngle:45,
    righBaseAngle:45,
    baseLength:1
  }

  let adjacent=arrSides[1];//left

  let opposite=arrSides[2];//top

  // if(angleLocation==="topLeft"){
  //   adjacent=left;
  //   opposite=base;
  // }
  // if(angleLocation==="topRight"){
  //   adjacent=top;
  //   opposite=left;
  // }
  // if(angleLocation==="baseRight"){
  //   adjacent=right;
  //   opposite=top;
  // }
  
  let hipotenusa=Math.sqrt(opposite*opposite + adjacent * adjacent);

  hashAngles["topRight"]=toDegrees(2*Math.acos(adjacent/hipotenusa));
  hashAngles["topLeft"]=180-hashAngles["topRight"]/2-hashAngles["baseLeft"]/2;
  hashAngles["baseRight"]=360-hashAngles["topRight"]-hashAngles["baseLeft"]-hashAngles["topLeft"];

  let piecesArr = []; //base,left,top,right
  piece.side="base";
  piece.leftBaseAngle=hashAngles["baseLeft"]/2;
  piece.righBaseAngle=hashAngles["baseRight"]/2;
  piece.baseLength=base;
  piecesArr.push(piece);
  
  piece.side="top";
  piece.leftBaseAngle=hashAngles["topLeft"]/2;
  piece.righBaseAngle=hashAngles["topRight"]/2;
  piece.baseLength=top;
  piecesArr.push(piece);

  piece.side="left";
  piece.leftBaseAngle=hashAngles["topLeft"]/2;
  piece.righBaseAngle=hashAngles["baseLeft"]/2;
  piece.baseLength=left;
  piecesArr.push(piece);

  piece.side="right";
  piece.leftBaseAngle=hashAngles["baseRight"]/2;
  piece.righBaseAngle=hashAngles["topRight"]/2;
  piece.baseLength=right;
  piecesArr.push(piece);

  return piecesArr;
}

function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

// function toRadians (angle) {
//   return angle * (Math.PI / 180);
// }
type product={
  size: number;
  price: number;
}

function simpleBestSplit(desiredAmount:number,desiredSize:number,products:product[]){
  let done=0;
  let bars=0;
  let bestCost=products[0].price*10*desiredAmount;
  let bestCostIndex=-1;
  let resto = products[bestCostIndex].size%desiredSize;
  let arrRestos=[];
  let arrBestRestos=[];

  for(let i=0;i<products.length;i++){
    if(products[i].size<desiredSize){
      i++;
    }
    let split = products[i].size/desiredSize;

    while(split < (done + desiredAmount)){
      bars ++;
      arrRestos.push(resto);
      done = done + split;
    }

    let left = desiredAmount - done;
    
    arrRestos.push(products[i].size-left*desiredSize);

    bars++;
    
    let totalCost=bars*products[i].price;

    if(totalCost<bestCost){
      bestCostIndex=i;
      arrBestRestos=arrRestos;
    }
    arrRestos=[];
  }
  
  let returnData ={
    product: products[bestCostIndex],
    leftOvers:arrBestRestos
  }

  if(bestCostIndex===-1){
    return "Products have the wrong size";
  }

  return returnData;
}

// function bestUseLinear(desiredAmount:number,desiredSize:number,products:product[]){

//   let costBenefit = [];
//   let best =  0;
//   let done=0;
//   let bars=0;

//   for(let i=0;i<products.length;i++){

//     let split = products[i].size/desiredSize;

//     let resto = products[i].size%desiredSize;

//     while(split < (done + desiredAmount)){
//       bars ++;
//       done = done + split;
//     }
    
//     let left = desiredAmount - done;

//     products[i].size-left*desiredSize;

//     let aproveitamento = (products[i].size-resto)/products[i].size;

//     let custoBeneficioParaProjeto = aproveitamento*(products[i].size/products[i].price);
//     costBenefit.push(custoBeneficioParaProjeto);
//     if (custoBeneficioParaProjeto>=best){
//       best = custoBeneficioParaProjeto;
//     }
//   }
//   return best
// }

// function bestUseArea(available:any,desiredNumber:number,desiredSize:number){
//   // materials[{size, price},{size1, price1}]
//   let available0={
//     size: 1,
//     price:5
//   }
//   let available1={
//     size: 2,
//     price:8
//   }
//   let avilableMaterial =[{available0},{available1}]
//   let resto = size%desiredSize;
//   let aproveitamento = (size-resto)/size;
//   let custoBeneficioParaProjeto = aproveitamento*(size/price);
//   // qual o menor size/price
//   // ordenar por size/price
//   // vai usando na ordem partindo do size>desiredSize
//   // size/price*%que sera usada   - leva conta perda e ordena

//   available/(desiredNumber*desiredSize);
// }

export default {
  calcPieces,
  simpleBestSplit
};
