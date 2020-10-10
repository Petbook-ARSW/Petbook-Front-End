import React, {useState} from 'react';

export default function Goal({ id, value, prize }) {

    const [newvalue, setNewvalue] = useState("")
    const [newprize, setNewprize] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        console.lo(newvalue+" , "+newprize)
    }

    return (
        <React.Fragment>
            <div class="row align-items-start">
                <button className="btn-invisible" data-toggle="modal" data-target="#updateGoal" onClick="">$ {value}</button>
                <p className="ml-3">{prize}</p>
            </div>
            <div className="modal fade" id="updateGoal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Modify goal</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <h5><strong>Value:</strong>{value}</h5>   
                                <h5><strong>Prize:</strong>{prize}</h5>
                                <input type="text" className="form-control mt-5" placeholder="New value" name="value"
                                    onChange={(e) => setNewvalue(e.target.value)}></input>
                                <input type="text" className="form-control mt-2" placeholder="New prize" name="prize"
                                        onChange={(e) => setNewprize(e.target.value)}></input>
                            </div>
                            <div className="modal-footer">
                                <button className="btn-petbook">Save</button>
                                <button className="btn-petbook">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}