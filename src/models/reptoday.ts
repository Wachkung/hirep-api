'use strict';
import Knex = require('knex');

export class ReptodayModels {

    today(knex: Knex) {
        let sql = `SELECT 
        'total is today' as  namecln,count(ovst.vn) as cns2 
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
                            (SELECT pttype.stdcode as icd10,
                            pttype.namepttype as icd10name,
                            a.pttype,
                            pttype.inscl,
                            sum(a.cns) as can 
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
                            GROUP BY   a.pttype   ORDER BY  can desc)d, (SELECT @rownum:=0) r
                            LIMIT 0, 1000000 ; 
                        `;
        return knex.raw(sql);

    }
    todaytotal(knex: Knex) {
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
                        WHERE DATE_FORMAT(ovst.vstdttm,'%Y-%m-%d')=DATE_FORMAT(NOW(),'%Y-%m-%d') 
                        GROUP by ovst.vn) as a GROUP BY a.cln 
						ORDER BY cns2 desc)d, (SELECT @rownum:=0) r
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
                            LIMIT 0, 1000000 ; 
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
                            LIMIT 0, 1000000 ; 
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
                            LIMIT 0, 1000000 ; ; 
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

}