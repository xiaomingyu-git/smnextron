import {Button, Col, Grid} from '@mantine/core';
import {useSearchTableForm} from './form-context';
import React from "react";
import {DatePicker} from '@mantine/dates';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

export function SearchTable() {
    const form = useSearchTableForm({
        initialValues: {
            receiveTimeStart: new Date()
        },
    });
    return    <form onSubmit={form.onSubmit((values) => {
        values.receiveTimeStart = dayjs(values.receiveTimeStart as Date).format("YYYY-MM-DD")
        console.log(values)
    } )} >
        <Grid>

            <Col span="content" > <DatePicker locale={'zh-cn'} allowFreeInput {...form.getInputProps('receiveTimeStart')} icon={<img src={"/images/calendar.svg"} alt={'日历'} />}
                                              styles={{ label: { margin: 'auto' },root:{ display:'flex'}}}
                                             inputFormat="YYYY-MM-DD" label="开始时间"
                                             labelFormat="YYYY-MM-DD"/></Col>
            <Col span="content"> <Button type="submit">Submit</Button></Col>
        </Grid>
    </form>;
}