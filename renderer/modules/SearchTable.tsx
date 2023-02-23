import {Button, Col, Grid} from '@mantine/core';
import {useSearchTableForm} from './form-context';
import React from "react";
import {DatePicker} from '@mantine/dates';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

const utc =require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

dayjs.extend(utc)
dayjs.extend(timezone)
export function SearchTable() {
    const form = useSearchTableForm({
        initialValues: {
           receiveTimeStart: null
        },
    });
    return    <form onSubmit={form.onSubmit((values) => {
        // @ts-ignore
        if(dayjs(values.receiveTimeStart).isValid()) {
            // @ts-ignore
            values.receiveTimeStart = dayjs.tz(values.receiveTimeStart as Date,'Asia/Shanghai').format("YYYY-MM-DD")
        } else {
            values.receiveTimeStart = null
        }
        console.log(values)
    } )} >
        <Grid>

            <Col span="content" > <DatePicker locale={'zh-cn'} allowFreeInput {...form.getInputProps('receiveTimeStart')} icon={<img src={"/images/calendar.svg"} alt={'日历'} />}
                                              styles={{ label: { margin: 'auto' },root:{ display:'flex'}}}
                                             inputFormat="YYYY-MM-DD" label="开始时间"
                                             labelFormat="YYYY-MM-DD"/></Col>
            <Col span="content"> <Button type="submit">Submit</Button></Col>
            <Col span="content">
            <Button onClick={() =>{form.setValues({
                receiveTimeStart:null
            })}}>清空时间</Button> </Col>
        </Grid>
    </form>;
}