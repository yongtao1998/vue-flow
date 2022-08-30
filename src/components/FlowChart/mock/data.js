var data = {
    name: '流程',
    nodeList: [
        {
            "id": "f7nflupci4",
            "name": "1",
            "type": "SHELL",
            "left": "102px",
            "top": "136px",
            "ico": "el-icon-time",
            "formFields": {
                "name": "1",
                "scripts": "1"
            },
            "status": true
        },
        {
            "id": "dxibdeb5p8",
            "name": "2",
            "type": "FLINK",
            "left": "102px",
            "top": "289px",
            "ico": "el-icon-odometer",
            "formFields": {
                "name": "2",
                "class": "2",
                "resources": "beijing"
            },
            "status": true
        },
        {
            "id": "apg69cp2uj",
            "name": "1",
            "type": "SHELL",
            "left": "476px",
            "top": "136px",
            "ico": "el-icon-time",
            "formFields": {
                "name": "1",
                "scripts": "222"
            },
            "status": true
        },
        {
            "id": "xgqg7797gf",
            "name": "3",
            "type": "FLINK",
            "left": "476px",
            "top": "289px",
            "ico": "el-icon-odometer",
            "formFields": {
                "name": "3",
                "resources": "shanghai",
                "class": "3"
            },
            "status": true
        }
    ],
    lineList: [
        {
            "from": "f7nflupci4",
            "to": "apg69cp2uj"
        },
        {
            "from": "f7nflupci4",
            "to": "dxibdeb5p8"
        },
        {
            "from": "apg69cp2uj",
            "to": "xgqg7797gf"
        },
        {
            "from": "dxibdeb5p8",
            "to": "xgqg7797gf"
        }
    ]
}

export function getData() {
    return data
}
