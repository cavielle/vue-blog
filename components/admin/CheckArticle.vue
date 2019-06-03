<template>
  <div>
    <el-main v-loading="loading">
      <el-button>Add</el-button>

      <el-table
        ref="singleTable"
        highlight-current-row
        :data="tableData.filter(data => !search || (data.title.toLowerCase().includes(search.toLowerCase()) || data.content.toLowerCase().includes(search.toLowerCase())))"
        @current-change="handleCurrentChange"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="标题" width="120"></el-table-column>
        <el-table-column prop="update" label="更新时间" width="140"></el-table-column>
        <el-table-column prop="tag" label="标签" width="140">
          <template slot-scope="scope">
            <!-- handleTag(scope.row.tag) -->
            <el-tag v-for="item in handleTag(scope.row.tag)" :key="item.tag">{{ item }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="content" label="内容"></el-table-column>

        <el-table-column prop="show" label="显示" width="50">
          <template slot-scope="scope">
            <!-- handleTag(scope.row.tag) -->
            <el-switch v-model="scope.row.show" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="MessageBox()">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<style lang="scss"scoped>
.el-tag {
  margin: 0.1rem 0.1rem 0.1rem 0;
}
</style>
