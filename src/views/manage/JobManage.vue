<template>
    <div class="job_manage">
        <div class="form_wrapper">
            <el-form
                    v-loading="loading"
                    ref="form"
                    class="left"
                    label-width="80px"
                    :rules="rules"
                    :model="form">
                <h3>西虹市招聘-新增职位</h3>
                <el-form-item label="标题" prop="name" >
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="company_name" >
                    <el-input v-model="form.company_name"></el-input>
                </el-form-item>
                <el-form-item label="办公地址" prop="address" >
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
                <div class="require" style="display: flex; width: 100%">
                    <el-form-item label="工作经验" label-width="80px" prop="experience" >
                        <el-select v-model="form.experience" placeholder="请选择">
                            <el-option label="无工作经验" value="无工作经验"/>
                            <el-option label="小于1年" value="小于1年"/>
                            <el-option label="1-3年" value="1-3年"/>
                            <el-option label="3-5年" value="3-5年"/>
                            <el-option label="大于5年" value="大于5年"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历要求" label-width="80px" prop="education" >
                        <el-select v-model="form.education" placeholder="请选择">
                            <el-option label="不限" value="无不限"/>
                            <el-option label="初中" value="初中"/>
                            <el-option label="高中" value="高中"/>
                            <el-option label="中专" value="中专"/>
                            <el-option label="大专" value="大专"/>
                            <el-option label="本科" value="本科"/>
                            <el-option label="硕士" value="硕士"/>
                            <el-option label="其他" value="其他"/>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="月薪" prop="salary" >
                    <el-select v-model="form.salary" placeholder="请选择">
                        <el-option label="面谈" value="面谈"/>
                        <el-option label="小于4000" value="小于4000"/>
                        <el-option label="4000-6000" value="4000-6000"/>
                        <el-option label="6000-8000" value="6000-8000"/>
                        <el-option label="8000-10000" value="8000-10000"/>
                        <el-option label="大于10000" value="大于10000"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司福利" prop="features" >
                        <el-checkbox-group v-model="form.features">
                            <div>
                                <el-checkbox disabled label="永不加班" border/>
                                <el-checkbox label="五险一金" border/>
                                <el-checkbox label="年底双薪" border/>
                                <el-checkbox label="节日福利" border/>
                                <el-checkbox label="带薪休假" border/>
                                <el-checkbox label="加班补助" border/>
                                <el-checkbox label="周末双休" border/>
                                <el-checkbox label="员工旅游" border/>
                            </div>
                        </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addClick">添加数据</el-button>
                    <el-button type="warning" @click="formReset">重置表单</el-button>
                </el-form-item>

            </el-form>

            <el-form
                    v-loading="loading"
                    class="right"
                    label-width="80px"
                    :model="form">
                <el-form-item label="职位描述" prop="responsibilities">
                    <el-input type="textarea" v-model="form.responsibilities"></el-input>
                </el-form-item>
                <el-form-item label="职位要求" prop="requirements">
                    <el-input type="textarea" v-model="form.requirements"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {job_api} from "@/network/job";
    import {news_api} from "@/network/news";

    export default {
        name: "JobManage",
        data() {
            return {
                loading: false,
                form: {
                    name: null,
                    salary: null,
                    company_name: null,
                    experience: null,
                    education: null,
                    address: null,
                    responsibilities: null,
                    requirements: null,
                    features: [],
                    desc: null
                },
                rules:{
                    name: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    salary: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                    ],
                    company_name: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                    ],
                    experience: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                    ],
                    education: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                    ],
                    address: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 10, max: 20, message: '长度在 10 到 20 个字符', trigger: 'blur'}
                    ],
                    responsibilities: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 50, max: 1000, message: '长度在 50 到 1000 个字符', trigger: 'blur'}
                    ],
                    requirements: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                        {min: 50, max: 1000, message: '长度在 50 到 1000 个字符', trigger: 'blur'}
                    ],
                    features: [
                        {required: true, message: '该项不能为空', trigger: 'blur'},
                    ],
                    desc: [
                        {max: 100, message: '不能超过100个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods:{
            addClick() {
                this.$refs["form"].validate((valid) => {
                    if (valid) {
                        // 数据验证通过,发送请求
                        this.loading = true;
                        job_api.post(this.form).then(ret => {
                            this.loading = false;
                            if (ret.code === 200) {
                                this.$message.success("发表成功");
                                this.$notify.info({
                                    title: '提醒',
                                    message: '避免重复提交,将清空数据'
                                });
                                this.$refs["form"].resetFields();
                            } else {
                                this.$message.error(ret.msg)
                            }
                        })
                    } else {
                        this.$message.error("请输入正确的数据")
                    }
                });
            },
            formReset() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .form_wrapper {
        display: flex;
        justify-content: space-evenly;
        min-height: 90vh;
        h3{
            text-align: center;
            font-weight: 200;
            margin: 30px 0;
            font-size: 30px;
        }
        .left, .right{
            /*border: 1px solid red;*/
            box-shadow: 1px 1px 10px rgba(128, 128, 128, 0.26);
            margin: 40px 10px;
            width: 45%;
            padding: 30px 10px 10px;
        }
        .left{
            padding: 30px
        }
    }
</style>
