import {Button, Col, Grid, Modal, NumberInput, TextInput} from "@mantine/core";
import React from "react";
import { useUserFormContext} from "./form-context";
export function Tablemodal({opened,handleopen}) {
    const form = useUserFormContext();
    return (
        <>
            <Modal
                opened={opened}
                onClose={() => handleopen.close()}
                title="Introduce yourself!"
            >
                    <form onSubmit={form.onSubmit((values) => console.log(values))} >
                        <Grid>
                        <Col span="content"> <NumberInput label="Age" {...form.getInputProps('age')}  /> </Col>
                        <Col span="content">   <TextInput label="Name" {...form.getInputProps('name')} /></Col>
                        <Col span="content">  <Button type="submit" >Submit</Button></Col>
                        </Grid>
                    </form>
            </Modal>
        </>

    )
}