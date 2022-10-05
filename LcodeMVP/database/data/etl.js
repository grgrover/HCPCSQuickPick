const fs = require("fs");
const fastcsv = require("fast-csv");
const { Client } = require("pg");
const assert = require('assert');
const path = require('path')
const db = require('./indexdb.js')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });



async function updateDMEPOS(records) {
  const client = await db.connect()

  await client.query('DROP DATABASE IF EXISTS mvp')
  await client.query('CREATE DATABASE IF NOT EXISTS mvp')
  await client.query('DROP TABLE IF EXISTS dmepos CASCADE')

  await client.query('CREATE TABLE IF NOT EXISTS dmepos (id SERIAL PRIMARY KEY, HCPCS VARCHAR, Mod VARCHAR, Mod2 VARCHAR, JURIS VARCHAR, CATG VARCHAR, Ceiling VARCHAR, Floor VARCHAR, AL_NR VARCHAR, AL_R VARCHAR, AR_NR VARCHAR, AR_R VARCHAR, AZ_NR VARCHAR, AZ_R VARCHAR, CA_NR VARCHAR, CA_R VARCHAR, CO_NR VARCHAR, CO_R VARCHAR, CT_NR VARCHAR, CT_R VARCHAR, DC_NR VARCHAR, DC_R VARCHAR, DE_NR VARCHAR, DE_R VARCHAR, FL_NR VARCHAR, FL_R VARCHAR, GA_NR VARCHAR, GA_R VARCHAR, IA_NR VARCHAR, IA_R VARCHAR, ID_NR VARCHAR, ID_R VARCHAR, IL_NR VARCHAR, IL_R VARCHAR, IN_NR VARCHAR, IN_R VARCHAR, KS_NR VARCHAR, KS_R VARCHAR, KY_NR VARCHAR, KY_R VARCHAR, LA_NR VARCHAR, LA_R VARCHAR, MA_NR VARCHAR, MA_R VARCHAR, MD_NR VARCHAR, MD_R VARCHAR, ME_NR VARCHAR, ME_R VARCHAR, MI_NR VARCHAR, MI_R VARCHAR, MN_NR VARCHAR, MN_R VARCHAR, MO_NR VARCHAR, MO_R VARCHAR, MS_NR VARCHAR, MS_R VARCHAR, MT_NR VARCHAR, MT_R VARCHAR, NC_NR VARCHAR, NC_R VARCHAR, ND_NR VARCHAR, ND_R VARCHAR, NE_NR VARCHAR, NE_R VARCHAR, NH_NR VARCHAR, NH_R VARCHAR, NJ_NR VARCHAR, NJ_R VARCHAR, NM_NR VARCHAR, NM_R VARCHAR, NV_NR VARCHAR, NV_R VARCHAR, NY_NR VARCHAR, NY_R VARCHAR, OH_NR VARCHAR, OH_R VARCHAR, OK_NR VARCHAR, OK_R VARCHAR, OR_NR VARCHAR, OR_R VARCHAR, PA_NR VARCHAR, PA_R VARCHAR, RI_NR VARCHAR, RI_R VARCHAR, SC_NR VARCHAR, SC_R VARCHAR, SD_NR VARCHAR, SD_R VARCHAR, TN_NR VARCHAR, TN_R VARCHAR, TX_NR VARCHAR, TX_R VARCHAR, UT_NR VARCHAR, UT_R VARCHAR, VA_NR VARCHAR, VA_R VARCHAR, VT_NR VARCHAR, VT_R VARCHAR, WA_NR VARCHAR, WA_R VARCHAR, WI_NR VARCHAR, WI_R VARCHAR, WV_NR VARCHAR, WV_R VARCHAR, WY_NR VARCHAR, WY_R VARCHAR, AK_NR VARCHAR, AK_R VARCHAR, HI_NR VARCHAR, HI_R VARCHAR, PR_NR VARCHAR, PR_R VARCHAR, VI_NR VARCHAR, VI_R VARCHAR, Description VARCHAR)')



  const text =
    "INSERT INTO dmepos (HCPCS,Mod,Mod2,JURIS,CATG,Ceiling,Floor,AL_NR,AL_R,AR_NR,AR_R,AZ_NR,AZ_R,CA_NR,CA_R,CO_NR,CO_R,CT_NR,CT_R,DC_NR,DC_R,DE_NR,DE_R,FL_NR,FL_R,GA_NR,GA_R,IA_NR,IA_R,ID_NR,ID_R,IL_NR,IL_R,IN_NR,IN_R,KS_NR,KS_R,KY_NR,KY_R,LA_NR,LA_R,MA_NR,MA_R,MD_NR,MD_R,ME_NR,ME_R,MI_NR,MI_R,MN_NR,MN_R,MO_NR,MO_R,MS_NR,MS_R,MT_NR,MT_R,NC_NR,NC_R,ND_NR,ND_R,NE_NR,NE_R,NH_NR,NH_R,NJ_NR,NJ_R,NM_NR,NM_R,NV_NR,NV_R,NY_NR,NY_R,OH_NR,OH_R,OK_NR,OK_R,OR_NR,OR_R,PA_NR,PA_R,RI_NR,RI_R,SC_NR,SC_R,SD_NR,SD_R,TN_NR,TN_R,TX_NR,TX_R,UT_NR,UT_R,VA_NR,VA_R,VT_NR,VT_R,WA_NR,WA_R,WI_NR,WI_R,WV_NR,WV_R,WY_NR,WY_R,AK_NR,AK_R,HI_NR,HI_R,PR_NR,PR_R,VI_NR,VI_R,Description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72, $73, $74, $75, $76, $77, $78, $79, $80, $81, $82, $83, $84, $85, $86, $87, $88, $89, $90, $91, $92, $93, $94, $95, $96, $97, $98, $99, $100, $101, $102, $103, $104, $105, $106, $107, $108, $109, $110, $111, $112, $113, $114)"

  process.stdout.write('...starting copy')

  for (var i=1; i<records.length; i++) {

    await client.query(text, records[i] ).catch(err=>{console.log(err); return err;})
  }


  process.stdout.write('...done copying')

   await client.query('CREATE INDEX dmepos_HCPCS_idx ON dmepos (HCPCS)')
  .then(()=> {console.log('index created')})
  .catch((err)=> {console.log(err); return err})

}

const getLCodes = (res)=> {
   db.query("select HCPCS, Description from dmepos where HCPCS >='L5000' and HCPCS < 'L8500'" )
   .then((data)=>{
    res.send(data.rows)})
   .catch(err=>{res.sendStatus(500).send(err)})

}
//updateDMEPOS();

module.exports={
  updateDMEPOS: updateDMEPOS,
  getLCodes: getLCodes
}