'use strict';
import Knex = require('knex');

export class ReptodayModels {

    bed(knex: Knex) {
        let sql = `select 
        date_format(now(),'%Y-%m-%d') as regdate
        ,date_format(now(),'%H:%i:%s') as regtime
         
        ,i.ward as ward_code
        ,d.nameidpm as ward_name
        ,d.bed as ward_bed
        ,COUNT(DISTINCT an) as ward_pt
         
         
        from 
        hi.ipt as i 
        left join hi.idpm as d on i.ward=d.idpm
        join hi.setup as s 
        where i.dchtype = 0 and year(i.rgtdate) between year(SUBDATE(now(),INTERVAL 1 year)) and year(now())   and ward <> ''
        group by i.ward`;
        return knex.raw(sql);
    }




    today(knex: Knex) {
        let sql = `SELECT 
        'total is today' as  today,count(ovst.vn) as amount 
        FROM cln INNER JOIN ovst ON cln.cln = ovst.cln 
        WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d')`;
        return knex.raw(sql);
    }
    todayipt(knex: Knex) {
        let sql = `
        SELECT
        'total is today' as  namecln,
        COUNT(pt.male) as male
        FROM hi.ipt 
        LEFT JOIN hi.pt ON ipt.hn = pt.hn
        WHERE dchdate ='0000-00-00' AND vn > 0 AND DATE_FORMAT(ipt.rgtdate,'%Y')>='2017'
        ORDER BY ipt.rgtdate DESC
    `;
        return knex.raw(sql);
    }
    todaytype(knex: Knex) {
        let sql = `
        SELECT @rownum:= @rownum+1 as Num, d.* FROM
        (SELECT  
        pttype.namepttype,
        a.pttype,
        pttype.inscl,
        sum(a.cns) as amount
        from(SELECT ovst.vn, 
        ovst.vstdttm, 
        ovst.hn, 
        count(ovst.vn) AS cns, 
        ovst.cln, 
        cln.namecln, 
        ovst.pttype
        FROM cln INNER JOIN ovst ON cln.cln = ovst.cln
        WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d')
        GROUP BY ovst.vn) as a 
        INNER JOIN pttype on pttype.pttype = a.pttype   
        GROUP BY   a.pttype   ORDER BY  amount desc)d, (SELECT @rownum:=0) r 
        LIMIT 0, 1000000 ; 
                        `;
        return knex.raw(sql);

    }
    todaytotal(knex: Knex) {
        let sql = `
                        SELECT @rownum:= @rownum+1 as Num, d.* FROM
						(SELECT  a.namecln ,a.cln,sum(a.cns) as amount
                        from(
                        SELECT ovst.vn, 
                        ovst.vstdttm, 
                        ovst.hn,
                        count(ovst.vn) as cns, 
                        ovst.cln, 
                        cln.namecln
                        FROM cln INNER JOIN ovst ON cln.cln = ovst.cln
                        WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d') 
                        GROUP by ovst.vn) as a GROUP BY a.cln 
						ORDER BY amount desc)d, (SELECT @rownum:=0) r
                        LIMIT 0, 1000000 ;  
                        `;
        return knex.raw(sql);
    }
    revier(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
                            (SELECT 
                            monthname(o.vstdttm) as m,
                            count(distinct o.vn) as revisit
                            from hi.ovst as o
                            inner join hi.ovstdx as d1 on o.vn=d1.vn
                            inner join 
                            (SELECT hn,vstdttm,icd10
                            from hi.ovst 
                            inner join hi.ovstdx on ovst.vn=ovstdx.vn and cnt='1' where 
                            vstdttm between '2017-10-01 00:00:00' and '2018-09-30 23:59:59' and cln='20100'
                            GROUP BY hn
                            ) as d2 
                            on (TIMEstampDIFF(day,d2.vstdttm,o.vstdttm) between 0 and 1) 
                            and o.vstdttm!=d2.vstdttm 
                            and o.vstdttm>d2.vstdttm 
                            and o.hn=d2.hn 
                            and d1.cnt='1'
                            where 
                            o.vstdttm between '2017-10-01 00:00:00' and '2018-09-30 23:59:59' and o.cln='20100' and d1.icd10 = d2.icd10
                            group by m order by o.vstdttm) d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ; 
                        `;
        return knex.raw(sql);
    }
    opicdtm(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
                            (SELECT 
                            ovstdx.icd10 as ICD10,
                            icd101.icd10name as ICD10NAME,
                            COUNT(icd101.icd10) as Total
                            FROM ovstdx 
                            INNER JOIN icd101 ON icd101.icd10 = ovstdx.icd10 
                            INNER JOIN ovst ON ovst.vn = ovstdx.vn 
                            WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d') 
                            AND
                            ovstdx.icd10 NOT LIKE 'Z%' AND
                            ovstdx.icd10 NOT BETWEEN 'O80' AND 'O849'
                            AND ovst.cln!='20100'AND cln!='40100' 
                            GROUP BY icd101.icd10 
                            ORDER BY total DESC
                            LIMIT 0, 10000000) d, (SELECT @rownum:=0) r
                            LIMIT 20 ; 
                        `;
        return knex.raw(sql);
    }
    ericdtm(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
                            (SELECT 
                            ovstdx.icd10 as ICD10,
                            icd101.icd10name as ICD10NAME,
                            COUNT(icd101.icd10) as Total
                            FROM ovstdx 
                            INNER JOIN icd101 ON icd101.icd10 = ovstdx.icd10 
                            INNER JOIN ovst ON ovst.vn = ovstdx.vn 
                            WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d') 
                            AND
                            ovstdx.icd10 NOT LIKE 'Z%' AND
                            ovstdx.icd10 NOT BETWEEN 'O80' AND 'O849'
                            AND ovst.cln='20100' 
                            GROUP BY icd101.icd10 
                            ORDER BY total DESC
                            LIMIT 0, 10000000) d, (SELECT @rownum:=0) r
                            LIMIT 0, 20 ; 
                        `;
        return knex.raw(sql);
    }
    dticdtm(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
                            (SELECT 
														dtdx.icdda as ICD10,
                            icdda.nameicdda as ICD10NAME,
                            COUNT(dtdx.icdda) as Total
                            FROM dtdx 
														INNER JOIN dt ON dt.dn = dtdx.dn
                            INNER JOIN icdda ON icdda.codeicdda = dtdx.icdda 
                            WHERE DATE_FORMAT(dt.vstdttm,'%Y-%m-%d') = DATE_FORMAT(NOW(),'%Y-%m-%d')AND
                            dtdx.icdda NOT LIKE 'Z%'
                            GROUP BY dtdx.icdda
                            ORDER BY total DESC
                            LIMIT 0, 10000000) d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ; 
                        `;
        return knex.raw(sql);
    }
    iptnum(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
							(SELECT aa.dct,aa.name,SUM(aa.10) as 'Oct',SUM(aa.11) as 'Nov',
                            SUM(aa.12)as 'Dec',SUM(aa.01)as 'Jan',SUM(aa.02) as 'Feb',
                            SUM(aa.03)as 'Mar',SUM(aa.04)as 'Apr',SUM(aa.05)as 'May',
                            SUM(aa.06)as 'jun',SUM(aa.07)as 'jul',SUM(aa.08)as 'Aug',
                            SUM(aa.09)as 'Sep',SUM(aa.vn) AS Sum ,SUM(aa.hn) AS hn
                            FROM (
                            SELECT
                            count(ovst.vn) AS vn ,
                            count(DISTINCT(ovst.hn)) AS hn ,
                            dct.lcno AS dct,CONCAT(dct.fname,' ',dct.lname) AS 'name',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 10 THEN '10' END) AS '10',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 11 THEN '11' END) AS '11',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 12 THEN '12' END) AS '12',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 01 THEN '01' END) AS '01',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 02 THEN '02' END) AS '02',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 03 THEN '03' END) AS '03',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 04 THEN '04' END) AS '04',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 05 THEN '05' END) AS '05',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 06 THEN '06' END) AS '06',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 07 THEN '07' END) AS '07',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 08 THEN '08' END) AS '08',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 09 THEN '09' END) AS '09'
                            FROM dct 
                            INNER JOIN ovst ON dct.dct = substr(ovst.dct,3,2)  
                            WHERE dct.lcno !='' AND ovst.dct !='' AND ovst.dct IS NOT NULL AND LEFT(ovst.dct,1) REGEXP '[a-z]' 
                            AND DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') BETWEEN '2017-10-01' AND '2018-09-330'  AND ovst.ovstost= '4'
                            GROUP BY dct 

                            UNION

                            SELECT 
                            count(ovst.vn) AS vn ,
                            count(DISTINCT(ovst.hn)) AS hn ,
                            dct.lcno AS dct,CONCAT(dct.fname,' ',dct.lname) AS 'name',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 10 THEN '10' END) AS '10',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 11 THEN '11' END) AS '11',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 12 THEN '12' END) AS '12',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 01 THEN '01' END) AS '01',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 02 THEN '02' END) AS '02',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 03 THEN '03' END) AS '03',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 04 THEN '04' END) AS '04',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 05 THEN '05' END) AS '05',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 06 THEN '06' END) AS '06',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 07 THEN '07' END) AS '07',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 08 THEN '08' END) AS '08',
                            COUNT(CASE WHEN MONTH(ovst.vstdttm) = 09 THEN '09' END) AS '09'
                            FROM ovst 
                            INNER JOIN dct ON dct.lcno = ovst.dct 
                            WHERE dct.lcno !='' AND ovst.dct !='' AND ovst.dct IS NOT NULL AND (DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') BETWEEN '2017-10-01' AND '2018-09-330') AND ovst.ovstost= '4' 
                            GROUP BY dct 
                            ) AS aa
                            GROUP BY aa.dct ORDER BY sum DESC)d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ; 
                        `;
        return knex.raw(sql);
    }
    reopuc(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
							(SELECT 
                            monthname(a.vstdttm) as 'month',
                            COUNT(a.vn) as 'count'
                            from(SELECT ovst.vn as vn,
                                ovst.an as an, 
                                ovst.vstdttm, 
                                ovst.hn, 
                                ovst.cln, 
                                cln.namecln, 
                                ovst.pttype
                            FROM cln 
                            INNER JOIN ovst ON cln.cln = ovst.cln
                            WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') BETWEEN '2017-10-01' and '2018-09-30' AND ovst.ovstost = '3' AND ovst.an = '0'
                            GROUP BY ovst.vn) as a 
                            INNER JOIN pttype on pttype.pttype = a.pttype
                            WHERE pttype.inscl = 'UCS' 
                            GROUP BY month ORDER BY a.vstdttm,count desc)d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ;   
                        `;
        return knex.raw(sql);
    }
    reipuc(knex: Knex) {
        let sql = `
                            SELECT @rownum:= @rownum+1 as Num, d.* FROM
							(SELECT 
                            monthname(a.vstdttm) as 'month',
                            COUNT(a.vn) as 'count'
                            from(SELECT ovst.vn as vn,
                                ovst.an as an, 
                                ovst.vstdttm, 
                                ovst.hn, 
                                ovst.cln, 
                                cln.namecln, 
                                ovst.pttype
                            FROM ovst 
                            INNER JOIN ipt ON ipt.vn = ovst.vn
                            INNER JOIN cln ON cln.cln = ovst.cln
                            WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') BETWEEN '2017-10-01' and '2018-09-30' AND ipt.dchtype = '4' 
                            GROUP BY ovst.vn) as a 
                            INNER JOIN pttype on pttype.pttype = a.pttype
                            WHERE pttype.inscl = 'UCS' 
                            GROUP BY month ORDER BY a.vstdttm,count desc)d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ;  
                        `;
        return knex.raw(sql);
    }
    overvisit(knex: Knex) {
        let sql = `
                            SELECT IF(month(o.vstdttm) < 10,year(o.vstdttm), year(ADDDATE(o.vstdttm,INTERVAL 1 year)) ) as yearbudget, 
                            count(distinct case month(o.vstdttm) when 10 then o.vn end) as 'Oct', 
                            count(distinct case month(o.vstdttm) when 11 then o.vn end) as 'Nov', 
                            count(distinct case month(o.vstdttm) when 12 then o.vn end) as 'Dec', 
                            count(distinct case month(o.vstdttm) when 1 then o.vn end) as 'Jan', 
                            count(distinct case month(o.vstdttm) when 2 then o.vn end) as 'Feb', 
                            count(distinct case month(o.vstdttm) when 3 then o.vn end) as 'Mar', 
                            count(distinct case month(o.vstdttm) when 4 then o.vn end) as 'Apr', 
                            count(distinct case month(o.vstdttm) when 5 then o.vn end) as 'May', 
                            count(distinct case month(o.vstdttm) when 6 then o.vn end) as 'jun', 
                            count(distinct case month(o.vstdttm) when 7 then o.vn end) as 'jul', 
                            count(distinct case month(o.vstdttm) when 8 then o.vn end) as 'Aug', 
                            count(distinct case month(o.vstdttm) when 9 then o.vn end) as 'Sep', 
                            count(distinct o.vn) as total ,
                            count(distinct o.hn) as hn 
                            FROM hi.ovst AS o 
                            LEFT JOIN hi.dt as d ON o.vn=d.vn 
                            WHERE (o.dct !='' or d.dnt !='') 
                            GROUP BY yearbudget 
                            DESC LIMIT 5;  
                        `;
        return knex.raw(sql);
    }
    overadmin(knex: Knex) {
        let sql = `
                            SELECT IF(month(o.vstdttm) < 10,year(o.vstdttm),year(ADDDATE(o.vstdttm,INTERVAL 1 year))) as yearbudget, 
                            count(distinct case month(o.vstdttm) when 10 then i.vn end) as 'Oct', 
                            count(distinct case month(o.vstdttm) when 11 then i.vn end) as 'Nov', 
                            count(distinct case month(o.vstdttm) when 12 then i.vn end) as 'Dec', 
                            count(distinct case month(o.vstdttm) when 1 then i.vn end) as 'Jan', 
                            count(distinct case month(o.vstdttm) when 2 then i.vn end) as 'Feb', 
                            count(distinct case month(o.vstdttm) when 3 then i.vn end) as 'Mar', 
                            count(distinct case month(o.vstdttm) when 4 then i.vn end) as 'Apr', 
                            count(distinct case month(o.vstdttm) when 5 then i.vn end) as 'May', 
                            count(distinct case month(o.vstdttm) when 6 then i.vn end) as 'jun', 
                            count(distinct case month(o.vstdttm) when 7 then i.vn end) as 'jul', 
                            count(distinct case month(o.vstdttm) when 8 then i.vn end) as 'Aug', 
                            count(distinct case month(o.vstdttm) when 9 then i.vn end) as 'Sep', 
                            count(distinct i.an) as total ,
                            count(distinct o.hn) as hn 
                            FROM hi.ovst AS o 
                            INNER JOIN hi.ipt as i ON o.an=i.an 
                            GROUP BY yearbudget
                            DESC LIMIT 5;  
                        `;
        return knex.raw(sql);
    }
    //รับตัวแปร ที่ส่งมาจาก router
    typetotal(knex: Knex, startdate: any, enddate: any) {
        // console.log(startdate);
        // console.log(enddate);
        let sql = `
                        SELECT @rownum:= @rownum+1 as Num, d.* FROM
						(SELECT  a.namecln,a.cln,sum(a.cns) as cns2
                        from(
                        SELECT ovst.vn, 
                        ovst.vstdttm, 
                        ovst.hn,
                        count(ovst.vn) as cns, 
                        ovst.cln, 
                        cln.namecln
                        FROM cln INNER JOIN ovst ON cln.cln = ovst.cln
                        WHERE DATE(ovst.vstdttm) BETWEEN '2017-10-01' and '2018-09-30'
                        GROUP by ovst.vn) as a GROUP BY a.cln 
						ORDER BY cns2 desc)d, (SELECT @rownum:=0) r
                        LIMIT 0, 1000000 ;  
                        `;
       // return knex.raw(sql, startdate, enddate);

       return knex.raw(sql);
    }



    todayreferout(knex: Knex) {
        let sql = `SELECT
        DATE_FORMAT(a.vstdate,'%Y-%m-%d') as refer_date,
      a.vsttime  as refer_time,
       cln.namecln  as clinic,
      
      icd101.icd10name ,
       
      hospcode.off_name1  as refer_to_hos
      from
      
      (SELECT orfro.rfrlct, 
          orfro.cln, 
          orfro.rfrcs, 
          orfro.icd10, 
          orfro.vstdate, 
          orfro.vsttime, 
          orfro.ward
      FROM orfro
      WHERE DATE_FORMAT(orfro.vstdate,'%Y-%m-%d')= CURDATE() and orfro.cln is not  null
      ORDER BY orfro.vsttime asc) as a   
      INNER join icd101 on icd101.icd10 = a.icd10
      INNER join cln on cln.cln =a.cln
      inner join  hospcode on hospcode.off_id = a.rfrlct`;
        return knex.raw(sql);
    }

    todayreferback(knex: Knex) {
        let sql = `
        SELECT
        DATE_FORMAT(a.rgtdate,'%Y-%m-%d')as refer_date,
             a.rgttime as refer_time,
          idpm.nameidpm  as dprtm,
          icd101.icd10name,
        hospcode.off_name1  as refer_in_hos
        
        from
        (SELECT 
         
         
            orfri.rfrno, 
            
        orfri.rfrlct, 
              ipt.ward, 
          ipt.prediag,
            ipt.rgtdate, 
            ipt.rgttime
        FROM ipt  
        
        INNER JOIN orfri ON ipt.vn = orfri.vn
              where ipt.rgtdate = CURDATE()) as a
        INNER JOIN hospcode on hospcode.off_id = a.rfrlct
        INNER JOIN icd101 on icd101.icd10 = a.prediag
        INNER join idpm on idpm.idpm =a.ward  ORDER BY a.rgttime  asc`;
        return knex.raw(sql);
    }

    todayrefersocial(knex: Knex) {
        let sql = `
        SELECT
        DATE_FORMAT(a.vstdate,'%Y-%m-%d') as refer_date,
      a.vsttime  as refer_time,
       
      idpm.nameidpm as dprtm,
      icd101.icd10name,
       
      hospcode.off_name1  as refer_so_hos
      from
      
      (SELECT orfro.rfrlct, 
       
          orfro.rfrcs, 
          orfro.icd10, 
          orfro.vstdate, 
          orfro.vsttime, 
          orfro.ward
      FROM orfro
      WHERE DATE_FORMAT(orfro.vstdate,'%Y-%m-%d')= CURDATE()  
      ORDER BY orfro.vsttime asc) as a   
      INNER join icd101 on icd101.icd10 = a.icd10
      INNER join idpm on idpm.idpm =a.ward
      inner join  hospcode on hospcode.off_id = a.rfrlct
      `;
        return knex.raw(sql);
    }

    todayopddead(knex: Knex) {
        let sql = `
        SELECT
        a.vstdate as dead_date,
        a.vsttime  as  dead_time,
        a.icd10 ,
        a.icd10name,
        cln.namecln  as  clinic
        
        from
        
        (SELECT ovstost.ovstost, 
            ovstost.nameovstos, 
            DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') AS vstdate, 
            DATE_FORMAT(ovst.vstdttm,'%H:%i:%s') AS vsttime,
            ovst.hn, 
             ovst.cln,
          group_CONCAT(ovstdx.icd10 SEPARATOR ',') AS icd10,
         group_CONCAT(icd101.icd10name SEPARATOR ',') AS icd10name
        FROM 
        ovstost 
        INNER JOIN ovst ON ovstost.ovstost = ovst.ovstost
        INNER JOIN ovstdx ON ovstdx.vn = ovst.vn
        INNER join icd101 on icd101.icd10 = ovstdx.icd10
        WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d') = CURDATE()
        and
        ovstost.ovstost = '2'  
        GROUP by  ovst.vstdttm,ovst.hn) as a 
        
        INNER join cln on cln.cln  =  a.cln  ORDER BY  a.vstdate desc
      `;
        return knex.raw(sql);
    }

    todayipddead(knex: Knex) {
        let sql = `
        select
        a.dchdate as dead_date,
        a.dchtime  as dead_time,
        a.icd10,
        a.icd10name,
        a.nameidpm  as dprtm
        
        
        from(SELECT ipt.ward,  
             ipt.an,
            ipt.dchdate, 
        group_CONCAT(iptdx.icd10 SEPARATOR ',') AS icd10,
        GROUP_CONCAT(icd101.icd10name SEPARATOR ',') AS icd10name,
             ipt.dchtime ,
             idpm.nameidpm
             
             
        FROM iptdx INNER JOIN ipt ON iptdx.an = ipt.an
        
        
         INNER JOIN icd101  on icd101.icd10 = iptdx.icd10
         INNER JOIN idpm  on idpm.idpm = ipt.ward
        
        WHERE ipt.dchdate = CURDATE()   and ipt.dchtype in('8','9')
        
         group by ipt.an,ipt.dchdate,ipt.dchtime,ipt.ward) as a  ORDER BY   a.dchdate, a.dchtime  asc
        
      `;
        return knex.raw(sql);
    }
    
    todaylrbrith(knex: Knex) {
        let sql = `
        SELECT

        DATE_FORMAT(lr1.brthdate,'%Y-%m-%d') as brthdate,
      
        child1.brthtime,
        lr1.bresult AS icd10,
        icd101.icd10name,
        IF(child1.male='1', "ชาย", "หญิง") AS sex,
        child1.brthwt,
        child1.alive
        FROM
        lr AS lr1
        INNER JOIN icd101 ON icd101.icd10 = lr1.bresult
        INNER JOIN child  as child1 ON child1.lrno = lr1.lrno
        where  lr1.brthdate = CURDATE()
        ORDER BY brthtime
      `;
        return knex.raw(sql);
    }
    
    todaylrwait(knex: Knex) {
        let sql = `
        SELECT
        d.idpm  as ward,
        
        DATE_FORMAT(i.rgtdate,'%Y-%m-%d') as rgtdate,
        count(i.hn) as  wait_case 
         FROM
        idpm AS d
        INNER JOIN ipt AS i ON d.idpm = i.ward
        INNER JOIN iptmove as m ON m.an = i.an AND m.vn = i.vn
        where i.ward = '05' and  i.rgtdate = CURDATE() and dchdate = '0000-00-00' 
        and m.wardold ='05' and m.wardnew = '05'
        GROUP BY hn
      `;
        return knex.raw(sql);
    }

    todayrevisit(knex: Knex) {
        let sql = `
        select 
        a.sex,a.age,a.first_dx as dx ,DATE_FORMAT(a.first_visit,'%Y-%m-%d')as fvisit
        ,DATE_FORMAT(a.revisit,'%Y-%m-%d') as revisit,a.revisit_time as revtime
        from(
        select 
        p.hn,
        p.pop_id as cid,
        concat(p.fname,' ',p.lname) as fullname,
        m.namemale as sex,
        floor(datediff(date(o.vstdttm),p.brthdate)/365.25) as age,
        d1.icd10 as first_dx,
        d2.icd10  as secon_dx,
        d2.vstdttm as first_visit,
        o.vstdttm as revisit,
        (TIMEDIFF(o.vstdttm,d2.vstdttm)) as revisit_time,
        p.fdate
        from hi.ovst as o
        inner join hi.pt as p on p.hn=o.hn
        inner join hi.male as m on p.male=m.male
        inner join hi.ovstdx as d1 on o.vn=d1.vn and d1.icd10 not like 'Z%'
        inner join (
        select hn,vstdttm,icd10 
        from hi.ovst 
        inner join hi.ovstdx on ovst.vn=ovstdx.vn and icd10 not like 'Z%' 
        where   date(ovst.vstdttm) between date_add(curdate(),interval -2 day)     
           AND  curdate()
        ) as d2 on (TIMEDIFF(o.vstdttm,d2.vstdttm) between 1 and 475959) and o.hn=d2.hn and d2.icd10=d1.icd10
        where   date(o.vstdttm) between date_add(curdate(),interval -2 day)     
         AND  curdate()  group by first_visit) as a where  date(a.revisit) = CURDATE() and date(a.fdate) <> CURDATE()
      `;
        return knex.raw(sql);
    }

    todayaccident(knex: Knex) {
        let sql = `
        SELECT
        
        acci.nameacci  as name_acci,
         a.icd103 as icd10,
         a.icd10name,
        COUNT(a.traffic) AS  amount
        
        from
        (SELECT emergency.vn, 
            emergency.traffic, 
            emergency.vstdttm, 
            ovst.hn, 
              
         group_CONCAT(ovstdx.icd10 SEPARATOR ',') AS icd103,
         group_CONCAT(icd101.icd10name SEPARATOR ',') AS icd10name
        
             
        FROM emergency INNER JOIN ovst ON ovst.vn = emergency.vn AND ovst.vstdttm = emergency.vstdttm
             INNER JOIN acci ON acci.codeacci = emergency.traffic
             INNER JOIN ovstdx ON ovstdx.vn = ovst.vn
              INNER join icd101  on icd101.icd10 = ovstdx.icd10
        WHERE DATE_FORMAT(emergency.vstdttm,'%Y-%m-%d') = CURDATE()   GROUP BY  emergency.traffic,emergency.traffic,emergency.vstdttm,ovst.hn) as a
         INNER join acci on acci.codeacci =a.traffic    GROUP BY  a.traffic
      `;
        return knex.raw(sql);
    }





}